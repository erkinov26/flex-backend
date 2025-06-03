const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Xabar matni yuborilmadi.' });
  }

  try {
    const response = await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.CHAT_ID,
      text,
      parse_mode: 'Markdown',
    });

    return res.status(200).json({ success: true, result: response.data });
  } catch (error) {
    console.error('Telegramga yuborishda xatolik new :', error.response?.data || error.message);
    return res.status(500).json({ error: 'Xabar yuborilmadi.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
