// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const Airtable = require('airtable');
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

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Twilio webhook for incoming SMS
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
      responseMessage =
        "You have unlimited readings. Text 'DRAW' any time to get another reading!";
      console.log(`User ${From} has NEWMOON => unlimited draws.`);
    } else if (existingDrawUsers.length > 0) {
      responseMessage = "Sorry, you've already used your free reading.";
      console.log(`User ${From} has DRAW => free reading used.`);
    } else {
      responseMessage = "Welcome! Next, text 'DRAW' to get your free reading.";
      console.log(`User ${From} does not have DRAW => instruct them to text DRAW.`);
    }
  } else if (normalizedBody === 'draw') {
    matchedKeyword = 'DRAW';

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
      responseMessage = await performCardDraw();
      console.log(`User ${From} performed an unlimited reading.`);
    } else {
      const existingDrawUsers = await usersTable
        .select({
          filterByFormula: `AND({Mobile} = '${From}', {Keyword} = 'DRAW')`,
          maxRecords: 1,
        })
        .firstPage();

      if (existingDrawUsers.length > 0) {
        responseMessage = "Sorry, you've already used your free reading.";
        console.log(`User ${From} already has DRAW => free reading used.`);
      } else {
        console.log(`Performing free reading for ${From}...`);
        responseMessage = await performCardDraw();

        try {
          await usersTable.create({
            Mobile: From,
            Keyword: 'DRAW',
            Status: 'active',
            'Last Used': new Date().toISOString(),
          });
          console.log(`Created user row for ${From} => free reading consumed.`);
        } catch (error) {
          console.error('Error creating user row for free reading:', error);
        }
      }
    }
  } else {
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

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(responseMessage);

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

async function performCardDraw() {
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
      return `Your reading: #${randomCard} - ${cardName} (${orientation})`;
    } else {
      console.warn(`No card found for #${randomCard} in the Cards table.`);
      return `Your random card is #${randomCard}, but it's not in the Cards table! (${orientation})`;
    }
  } catch (error) {
    console.error('Error drawing random card:', error);
    return 'An error occurred while drawing a card. Please try again later!';
  }
}

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
