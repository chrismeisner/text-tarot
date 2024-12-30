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

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Twilio webhook for incoming SMS
app.post('/sms', async (req, res) => {
  const { Body, From } = req.body;
  console.log(`Received SMS from ${From}: ${Body}`);

  // 1) Log inbound message to the Inbox table
  try {
    await inboxTable.create({
      Mobile: From,
      Message: Body,
    });
    console.log('Message successfully logged in Inbox table.');
  } catch (error) {
    console.error('Error logging message to Inbox:', error);
  }

  // 2) Check if this user already exists in the Users table
  try {
    const existingUsers = await usersTable
      .select({
        filterByFormula: `{Mobile} = '${From}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (existingUsers.length === 0) {
      // If no user found, create a new record in Users
      await usersTable.create({
        Mobile: From,
        Status: 'active', // or any default
      });
      console.log('New user created in Users table.');
    } else {
      console.log('User already exists in Users; skipping creation.');
    }
  } catch (error) {
    console.error('Error checking/creating user in Users table:', error);
  }

  // 3) Look up the inbound message in the Keywords table
  // Convert inbound Body to lowercase for matching
  const normalizedBody = Body.trim().toLowerCase();

  let responseMessage = "What's the secret password?"; // default if no keyword is found

  try {
    // Use a filterByFormula to find the matching keyword record
    const matchedKeywords = await keywordsTable
      .select({
        filterByFormula: `LOWER({Keyword}) = '${normalizedBody}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (matchedKeywords.length > 0) {
      // If we found a matching keyword record, use its "Message" field as the response
      const record = matchedKeywords[0];
      const keywordResponse = record.get('Message'); // <-- Renamed field here
      responseMessage = keywordResponse || "Welcome!";
      console.log(`Matched keyword. Using message: ${responseMessage}`);
    } else {
      console.log(`No matching keyword for "${Body}" – using default response.`);
    }
  } catch (error) {
    console.error('Error looking up keyword:', error);
  }

  // 4) Send the response back to the user via Twilio
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(responseMessage);
  res.type('text/xml').send(twiml.toString());
});

// Test environment endpoint
app.get('/test-env', async (req, res) => {
  try {
    // Test a small query on the Inbox table
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

// Catch-all route to serve the React app for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Use the environment’s port or default to 5000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
