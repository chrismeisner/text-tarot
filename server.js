// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const Airtable = require('airtable');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();

// Middleware for parsing URL-encoded data (for Twilio webhook)
app.use(bodyParser.urlencoded({ extended: false }));

// Airtable setup
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const base = airtable.base(process.env.AIRTABLE_BASE_ID);

// Reference your tables
const inboxTable = base('Inbox');
const usersTable = base('Users');
const keywordsTable = base('Keywords');
const cardsTable = base('Cards');
const outboxTable = base('Outbox'); // For storing outgoing messages

// OpenAI setup (v4)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

/**
 * Helper function to get AI-generated card insight
 * - Now asks for a 60-word insight.
 * - Mentions imagery/iconography if relevant.
 */
async function getAiCardInsight(cardName, orientation, userContext = '') {
  const userContextString = userContext
    ? `\n\nAdditional context from the user:\n"${userContext}"`
    : '';

  const prompt = `
Write a 60-word insight on the tarot card "${cardName}" in the "${orientation}" position.
Feel free to mention relevant imagery and iconography typically depicted on the card.
${userContextString}
Use a warm, friendly, and concise tone.
  `.trim();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a tarot expert.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 200, // Increased to allow for a slightly longer response
    });

    const aiText = completion.choices[0].message.content.trim();
    return aiText;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return "I'm having trouble connecting to my crystal ball. Please try again later.";
  }
}

/**
 * Function to perform a card draw,
 * includes userContext for AI.
 */
async function performCardDraw(userContext = '') {
  const randomCard = Math.floor(Math.random() * 78) + 1;
  const orientation = Math.random() < 0.5 ? 'upright' : 'reversed';

  try {
    const cardRecords = await cardsTable
      .select({
        filterByFormula: `{Number} = ${randomCard}`,
        maxRecords: 1,
      })
      .firstPage();

    if (cardRecords.length > 0) {
      const cardName = cardRecords[0].get('Name') || 'an unknown card';
      const aiInsight = await getAiCardInsight(cardName, orientation, userContext);

      // Provide correct article for upright vs. reversed
      const orientationDisplay = orientation === 'upright' ? 'an upright' : 'a reversed';

      return `Your card is ${orientationDisplay} ${cardName}\n\n${aiInsight}`;
    } else {
      console.warn(`No card found for #${randomCard} in the Cards table.`);
      return `Your random card is #${randomCard}, but it's not in the Cards table! (${orientation})`;
    }
  } catch (error) {
    console.error('Error drawing random card:', error);
    return 'An error occurred while drawing a card. Please try again later!';
  }
}

/**
 * Twilio webhook for incoming SMS
 */
app.post('/sms', async (req, res) => {
  const { Body, From } = req.body;
  console.log(`Received SMS from ${From}: ${Body}`);

  // 1) Log the inbound message in the Inbox table
  try {
    await inboxTable.create({
      Mobile: From,
      Message: Body,
    });
    console.log('Message successfully logged in Inbox table.');
  } catch (error) {
    console.error('Error logging message to Inbox:', error);
  }

  let responseMessage = "What's the secret password?";
  let matchedKeyword = null;
  const normalizedBody = Body.trim().toLowerCase();

  // Special logic for TAROT and DRAW
  if (normalizedBody === 'tarot') {
    matchedKeyword = 'TAROT';

    const [existingDrawUsers, existingNewMoonUsers] = await Promise.all([
      usersTable
        .select({
          filterByFormula: `AND({Mobile} = '${From}', {Keyword} = 'DRAW')`,
          maxRecords: 1,
        })
        .firstPage(),
      usersTable
        .select({
          filterByFormula: `AND({Mobile} = '${From}', {Keyword} = 'NEWMOON')`,
          maxRecords: 1,
        })
        .firstPage(),
    ]);

    if (existingNewMoonUsers.length > 0) {
      responseMessage = "You have unlimited readings. Text 'DRAW' any time to get another reading!";
      console.log(`User ${From} has NEWMOON => unlimited draws.`);
    } else if (existingDrawUsers.length > 0) {
      responseMessage = "You get one free tarot reading per day. Text 'DRAW' to see if you're eligible for another reading today.";
      console.log(`User ${From} has DRAW => daily usage applies.`);
    } else {
      responseMessage = "Welcome! Text 'DRAW' to get your free daily reading. (One reading every 24 hours, unless you have NEWMOON.)";
      console.log(`User ${From} does not have DRAW => instruct them to text DRAW.`);
    }
  } else if (normalizedBody.startsWith('draw')) {
    matchedKeyword = 'DRAW';

    /**
     * Extract userContext from the rest of the user’s message.
     * Example: "Draw this card to explore my relationship with my dad"
     * => userContext = "this card to explore my relationship with my dad"
     */
    const userContext = Body.trim().length > 4
      ? Body.trim().substring(4).trim()
      : '';

    let unlimited = false;
    try {
      const existingNewMoonUsers = await usersTable
        .select({
          filterByFormula: `AND({Mobile} = '${From}', {Keyword} = 'NEWMOON')`,
          maxRecords: 1,
        })
        .firstPage();

      if (existingNewMoonUsers.length > 0) {
        unlimited = true;
        console.log(`User ${From} has NEWMOON => unlimited draws enabled.`);
      }
    } catch (error) {
      console.error('Error checking NEWMOON status:', error);
    }

    if (unlimited) {
      // If they have NEWMOON, no daily limit
      responseMessage = await performCardDraw(userContext);
      console.log(`User ${From} performed an unlimited reading with context: ${userContext}`);
    } else {
      /**
       * Daily usage limit logic
       */
      try {
        const existingDrawUsers = await usersTable
          .select({
            filterByFormula: `AND({Mobile} = '${From}', {Keyword} = 'DRAW')`,
            maxRecords: 1,
          })
          .firstPage();

        if (existingDrawUsers.length > 0) {
          const userRecord = existingDrawUsers[0];
          const lastUsedStr = userRecord.get('Last Used');
          const lastUsedDate = lastUsedStr ? new Date(lastUsedStr) : null;
          const now = new Date();

          if (!lastUsedDate) {
            // If no Last Used, treat this as their first daily reading
            responseMessage = await performCardDraw(userContext);
            await usersTable.update(userRecord.id, {
              'Last Used': now.toISOString(),
            });
            console.log(`Updated user (Mobile=${From}) with a new Last Used date.`);
          } else {
            const diffMs = now - lastUsedDate;
            const diffHours = diffMs / (1000 * 60 * 60);

            if (diffHours >= 24) {
              // Let them draw again
              responseMessage = await performCardDraw(userContext);
              await usersTable.update(userRecord.id, {
                'Last Used': now.toISOString(),
              });
              console.log(`User ${From} performed a new daily reading with context: ${userContext}`);
            } else {
              // Not enough time has passed
              const hoursRemaining = (24 - diffHours).toFixed(1);
              responseMessage = `Sorry, you must wait another ${hoursRemaining} hours before your next daily reading. Come back soon!`;
              console.log(`User ${From} attempted a daily reading within 24 hours => blocked.`);
            }
          }
        } else {
          // Brand new user for "DRAW"
          responseMessage = await performCardDraw(userContext);
          try {
            await usersTable.create({
              Mobile: From,
              Keyword: 'DRAW',
              Status: 'active',
              'Last Used': new Date().toISOString(),
            });
            console.log(`Created user row for ${From} => daily reading started with context: ${userContext}`);
          } catch (error) {
            console.error('Error creating user row for daily reading:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching user for daily usage:', error);
        responseMessage = 'An error occurred while checking your daily reading status. Please try again later!';
      }
    }
  } else {
    // Check if it matches any generic keyword in Keywords table
    try {
      const matchedRecords = await keywordsTable
        .select({
          filterByFormula: `LOWER({Keyword}) = '${normalizedBody}'`,
          maxRecords: 1,
        })
        .firstPage();

      if (matchedRecords.length > 0) {
        matchedKeyword = matchedRecords[0].get('Keyword');
        const keywordResponse = matchedRecords[0].get('Message');
        if (keywordResponse) {
          responseMessage = keywordResponse;
          console.log(`Matched generic keyword='${matchedKeyword}'.`);
        }

        await upsertUser(From, matchedKeyword);
      } else {
        console.log(`No match in Keywords for '${Body}'. Using default secret password response.`);
      }
    } catch (error) {
      console.error('Error looking up general keyword:', error);
    }
  }

  // Twilio response
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(responseMessage);

  // Log the outbound message in the Outbox
  try {
    await outboxTable.create({
      Mobile: From,
      Message: responseMessage,
      Keyword: matchedKeyword || '',
    });
    console.log('Message logged in Outbox table.');
  } catch (error) {
    console.error('Error logging to Outbox:', error);
  }

  res.type('text/xml').send(twiml.toString());
});

/**
 * Helper function to upsert a user (for other keywords, non-draw)
 */
async function upsertUser(mobile, keyword) {
  try {
    const existingUsers = await usersTable
      .select({
        filterByFormula: `AND({Mobile} = '${mobile}', {Keyword} = '${keyword}')`,
        maxRecords: 1,
      })
      .firstPage();

    if (existingUsers.length > 0) {
      const userRecordId = existingUsers[0].id;
      await usersTable.update(userRecordId, {
        'Last Used': new Date().toISOString(),
      });
      console.log(`Updated existing user (Mobile=${mobile}, Keyword=${keyword}).`);
    } else {
      await usersTable.create({
        Mobile: mobile,
        Keyword: keyword,
        Status: 'active',
        'Last Used': new Date().toISOString(),
      });
      console.log(`Created new user record (Mobile=${mobile}, Keyword=${keyword}).`);
    }
  } catch (error) {
    console.error('Error upserting user:', error);
  }
}

app.get('/test-env', async (req, res) => {
  try {
    const records = await inboxTable.select({ maxRecords: 1 }).firstPage();
    console.log('Airtable connection successful:', records.length > 0);

    res.json({
      success: true,
      message: 'Environment connection successful',
      airtableCheck: 'Connected',
    });
  } catch (error) {
    console.error('Error checking Airtable connection:', error);
    res.json({
      success: false,
      message: 'Environment connection failed',
      error: error.message,
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
