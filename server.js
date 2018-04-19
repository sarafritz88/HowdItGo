require('dotenv').config();
const twilio = require('twilio');
const accountSid = process.env.TWILIO_TEST_ACCOUNT_SID;
const authToken = process.env.TWILIO_TEST_AUTHTOKEN;
const port = process.env.PORT || 5001;

const client = new twilio(accountSid, authToken);

const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json({ success: 'this is working' });
});

server.post('/', (req, res) => {
  const message = req.body;
  client.messages
    .create({
      body: message.text,
      to: '+18569744731', // Text this number
      from: '+15612796790' // From a valid Twilio number
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

server.listen(port, console.log('server running'));
