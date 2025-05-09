const express = require('express');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Khalied Alqaid bot is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('جاهز بحمد الله');
});

client.on('message', async msg => {
  const chat = await msg.getChat();
  if (!chat.isGroup) return;

  const text = msg.body.trim();
  const wordCount = text.split(/\s+/).length;

  let audioPath = '';
  if (wordCount <= 15) {
    audioPath = './khalied.mp3'; // رد خالد
  } else {
    audioPath = './khalied_alqaid_soft_resonance.mp3'; // رد خالد القائد
  }

  const media = MessageMedia.fromFilePath(audioPath);
  chat.sendMessage(media);
});

client.initialize();
