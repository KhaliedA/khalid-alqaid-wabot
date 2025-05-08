const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('خالد القائد جاهز.');
});

client.on('message', async msg => {
    const chat = await msg.getChat();
    if (!chat.isGroup) return;

    const text = msg.body.trim();
    const wordCount = text.split(/\s+/).length;

    let audioPath = '';
    if (wordCount < 15) {
        audioPath = './khalid.mp3'; // صوت خالد العادي
    } else {
        audioPath = './khalid_alqaid_soft_resonance.mp3'; // صوت خالد القائد
    }

    const media = MessageMedia.fromFilePath(audioPath);
    chat.sendMessage(media);
});

client.initialize();
