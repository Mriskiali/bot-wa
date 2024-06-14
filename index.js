const {
  makeWASocket,
  useMultiFileAuthState,
  Browsers,
  downloadContentFromMessage,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const { createSticker, StickerTypes } = require("wa-sticker-formatter");

async function connectWhatsapp() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const socket = makeWASocket({
    printQRInTerminal: true,
    browser: Browsers.ubuntu("Desktop"), // Specified browser configuration
    auth: state,
    logger: pino({ level: "silent" }),
  });

  socket.ev.on("creds.update", saveCreds);
  socket.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log("Bot Sudah Siap");
    } else if (
      connection === "close" &&
      lastDisconnect?.error?.output?.statusCode !== 401
    ) {
      console.log("Connection closed, reconnecting...");
      await connectWhatsapp(); // Reconnect on disconnection
    }
  });

  socket.ev.on("messages.upsert", async ({ messages, type }) => {
    const chat = messages[0];
    const pesan = (
      chat.message?.extendedTextMessage?.text ??
      chat.message?.ephemeralMessage?.message?.extendedTextMessage?.text ??
      chat.message?.conversation ??
      ""
    ).toLowerCase(); // Fixing string conversion

    if (pesan === ".ping") {
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: "Halo" },
        { quoted: chat }
      );
    } else if (pesan === ".nigger") {
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: "Kamu Hitam" },
        { quoted: chat }
      );
    } else if (pesan === ".menu") {
      const menuText = `

  `;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".mats") {
      const menuText = ``;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".listbuff") {
      const menuText = ``;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".proffup") {
      const menuText = ``;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".mapleveling") {
      const menuText = ``;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".uptas") {
      const menuText = ``;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".levelingpet") {
      const menuText = ``;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".bahanmq") {
      const menuText = ``;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".counterele") {
      const menuText = ``;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".xtallup") {
      const menuText = ``;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (
      chat.message.imageMessage?.caption === ".stiker" &&
      chat.message.imageMessage
    ) {
      const getMedia = async (msg) => {
        const messageType = Object.keys(msg?.message)[0];
        const stream = await downloadContentFromMessage(
          msg.message[messageType],
          messageType.replace("Message", "")
        );
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
      };
      const mediaData = await getMedia(chat);
      const stickerOptions = {
        pack: "",
        author: "",
        type: StickerTypes.FULL,
        quality: 50,
      };
      const generateSticker = await createSticker(mediaData, stickerOptions);
      await socket.sendMessage(chat.key.remoteJid, {
        sticker: generateSticker,
      });
    }
  });
}

connectWhatsapp().catch((err) => console.log("Unexpected error: " + err));
