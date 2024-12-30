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
const table = airtable.base(process.env.AIRTABLE_BASE_ID)(process.env.AIRTABLE_TABLE_NAME);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Twilio webhook for incoming SMS
app.post('/sms', async (req, res) => {
  const { Body, From } = req.body;

  console.log(`Received message from ${From}: ${Body}`);

  // Log the message in Airtable
  try {
	await table.create({
	  Mobile: From,
	  Message: Body,
	});
	console.log('Message logged in Airtable.');
  } catch (error) {
	console.error('Error logging to Airtable:', error);
  }

  // Respond to the user
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message("Thanks for reaching out! We'll let you know when we're ready.");
  res.type('text/xml').send(twiml.toString());
});

// Catch-all route to serve the React app for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Use the environment’s port or default to 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
