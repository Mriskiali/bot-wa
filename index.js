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
  MENU 📚
  
  .mats
  .listbuff
  .proffup
  .mapleveling
  .uptas
  .levelingpet
  .bahanmq
  .counterele
  .xtallup
  `;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".mats") {
      const menuText = `
《          🪵KAYU🪵          》 
─────────────────────
Mob: Ivy = Batang Tebal Muda
Mob: Ivy = Sulur Rambat
Mob: Pohon parasit : Akar P.K
Mob: Pohon parasit : Benih Gulma
Mob: Pohon parasit : Daun Kering

 《          🔮MANA🔮          》 
─────────────────────
Mob: Laduro = Bola Mata Redup
Mob: (EVENT SUMMER)
Boss : (EVENT LAINNYA)


_ 《         🧣KAIN🧣          》_ 
─────────────────────
Mob: Laduro = Cawat Merah Tua
Mob: Laduro = Kain Maling
Mob: Potum semedi = Sayap Nirwana
Mob: Potum semedi = Celemek robek

 《          💊OBAT💊          》 
─────────────────────
Mob:  Jelly = Agar-Agar Merah Ungu
Mob: Jelly = Cairan Asan Manis
Mob: Lettacia = Daun Kepala
Mob: Lattecia = Air mata sapion

《         🦏FAUNA🐃           》 
─────────────────────
Mob: Tailgon = Tanduk Panas Dahsyat
Mob: Tailgon = Ekor Panas Dahsyat
Mob: Famarin = Moncong tipis
Mob: Famarin = Pelat Melingkar
Mob: Lattecia = Ekor spiral

《         🪨LOGAM🪨          》 
─────────────────────
Mob:  Laduro = Mineral Cantik
Mob: Bb =  Halo terputus
Mob: Bb = Kerikil dewa
Mob: Bitum = Batu bara berkualitas
Mob: Bitum = Kerikil gosong
Mob: Breppa = Ekor mengkristal
Mob: Breppa = Kaki mengkristal
Mob: Famarin = Batu karang
    `;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".listbuff") {
      const menuText = `
List Buff


List Code Address Buff Toram Online


⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖



🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥


ATK 🍕
5010007 lvl 8
4147129 lvl 6

MATK 🍕
1011133 lvl 4

STR 🍙
1110033 Lv10
4016699 Lv10
7070777 Lv10
7031997 Lv10
1011069 Lv10
2020303 Lv10
3010095 Lv10
2180000 Lv10
2010085 Lv10


DEX 🍙
2020222 Lv10
7011001 Lv10
1010058 Lv10
1010106 Lv10
5010092 Lv10
4084545 Lv10
1020001 Lv10
7200002 Lv10
5010031 Lv10
6010003 Lv10
1234567 Lv10


INT 🍙
2020707 Lv10
1032222 Lv10
6061294 Lv10
1010489 Lv10
6010701 Lv10
7010018 Lv10

AGI 🍙
7162029 lv 10
3260777 lvl 10
3192311 lvl 10

VIT 🍙
2020909 lvl 9
5130123 lvl 9

CRIT RATE 🍢
1100000 Lv10*
1200069 Lv10
1010006 Lv10
1010092 Lv10
1010017 Lv10
1010050 Lv10
1011010 Lv10
1012000 Lv10
7162029 Lv10
1069927 Lv10
1012000 Lv10
1010433 Lv10
3020108 Lv10
1200069 Lv10
7010086 Lv10
5010098 Lv10
5112709 Lv10
3010048 Lv10
1011010 Lv10
1037777 Lv10


ACCURACY 🍝
4261111 lvl 10
1010013 lvl 9

W. ATK 🍕
1010099 lvl 10
1011126 lvl 10
2020404 lvl 10
2010136 lvl 10
1010810 Lv10
1010029 Lv10
7010032 Lv10
7010023 Lv10
7086969 Lv10
1067777 Lv10
6100000 Lv10
2010007 Lv10
3132109 Lv10
1010029 Lv10

AMPR 🍝
1023040 Lv10
1010017 Lv10
1010092 Lv10
1010006 Lv10
5240001 Lv10
1010050 Lv10
1019696 Lv10
3226325 Lv10
5010103 Lv10
1011010 Lv10
3063101 Lv10
3062728 Lv10
1010006 Lv10
4040404 Lv10
3062111 Lv10
5252525 Lv10
2010068 Lv10
4206969 Lv10
5010031 Lv10

MP 🍛
1010216 Lv10
3080021 Lv10
6010021 Lv10
6052000 Lv10
7010047 Lv10
6070013 Lv10
3204544 Lv10
1016646 Lv10
4011793 Lv10
1010013 Lv10
1011212 Lv10
3080021 Lv10
1111999 Lv10
1027777 Lv10
3113105 Lv10
3010037 Lv10
3010069 Lv10
1100008 Lv10
2010079 Lv10
5010080 Lv10
2010091 Lv10
1010142 Lv10
6070013 Lv10


HP 🍛
3011143 Lv10
1180755 Lv10
1010032 Lv10
1010084 Lv10
1010101 Lv10
1011945 Lv10
1222002 Lv10
1234567 Lv10
3011143 Lv10
1010203 Lv10
6010062 Lv10
3191130 Lv10
1010084 Lv10
3010058 Lv10
3010006 Lv10
3066969 Lv10
1222002 Lv10



-AGGRO 🍲
1010038 Lv10
1010002 Lv10
1010147 Lv10
1016646 Lv10
6010009 Lv10
3010018 Lv10
6010009 Lv9
2020808 Lv9
3134610 Lv9
1261807 Lv9
7190001 Lv9

+AGGRO 🍔
2020606 Lv10
3030110 Lv10
1264321 Lv10
3053131 Lv10
1016646 Lv10
6262000 Lv10
1010207 Lv10
3204544 Lv10
3158668 Lv10
6262000 Lv9
1190069 Lv9
1013000 Lv9
7261597 Lv9
3066969 Lv9
1014230 Lv9
2020606 Lv9
2010136 Lv9
1013000 Lv9



P. RESIST 🍔
1020001 Lv10
1010081 Lv10
1100000 Lv10
3010034 Lv10
7010014 Lv10
1018989 Lv9
1100000 Lv9
6011415 Lv9
4200069 Lv9
6010701 Lv9
3011999 Lv9


M. RESIST 🍔
1010004 Lv10
2020505 Lv10
5246969 Lv10
7010016 Lv10
7030023 Lv10
4080087 Lv9
1100000 Lv9
7227777 Lv9
7222227 Lv9



DTE EARTH 🌮
3210103 lvl 10
1011001 lvl 9
2020202 lvl 9
2022222 lvl 8
2020202 lvl 8
4083005 lvl 8 
2099876 lvl 7
5240001 lvl 7
3011143 lvl 7
1010002 lvl 6

DTE DARK 🌮
1190020 lvl 10
6010003 lvl 9
3210104 lvl 9
5010092 lvl 9
2261111 lvl 9
6010003 lvl 8
1091111 lvl 8
1010006 lvl 7
3030069 lvl 7

DTE FIRE 🌮
3210106 lvl 9
7011001 lvl 8
1010799 lvl 7
1012610 lvl 5

DTE WIND 🌮
3210101 lvl 9
3030303 lvl 9
1010055 lvl 7 
4099876 lvl 7   
1010055 lvl 7

DTE WATER 🌮
3210100 lvl 9
7150030 lvl 9
3062111 lvl 8
7011001 lvl 8
1110007 lvl 7
3226325 lvl 6

DTE LIGHT 🌮
3210105 lvl 9
1020345 lvl 9
4046666 lvl 8
4016699 lvl 6

DTE NEUTRAL 🌮
3210102 lvl 9
3099876 lvl 7
1011902 lvl 7
6061294 lvl 7
1019696 lvl 6
1032727 lvl 5

Drop Rate 🌯
4196969 Lv6
1010085 Lv6
1010018 Lv5

⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
    `;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".proffup") {
      const menuText = `
List Leveling profiency Blacksmith

Ver 1

> 1-10 weap apapun  
> 10-50 1h rapier 
[pasir halus x5 + tulang naga x30]
>50-90 1h pedang indigo [sirip panas x20 + pedang cacat x5]
>90-140 Hb baskara [prasasti bersina x5 + halo terputusx20]
>140-170 bakung lelabang merah
[kristal merah kehitaman x5 + kulit ular aneh x20]
>170-200 arachi sword 
[air ajaib berseri x2 + kristal roh jahat x1]
>200-240 kostum pengelabu

Ver 2

  ⭕ BS Tank,1H/2H,Bow/Bwg,Ktn
▫️0-15 Baju Pengelana
▫️15-120 Baju Diomedia
▫️120-140 Tombak Baskara
▫️140-170 Katan Bakung Lelabah Merah
▫️170-200 2H Golok Pembasmi Naga / 1H Pedang Archanida
▫️200-240 kostum pengelabu
▫️200-225 Baju Dara
▫️225-250 2H Pholidata

️⭕BS Tombak/Tinju,MD/Tongkat harus di isi sedikit TEC minimal 10
▫️0-15 Baju Pengelana
▫️15-50 Tinju Hard Knucles
▫️50-90 Pedang Indigo
▫️90-120 Baju Diomedia
▫️120-140 Tombak Baskara
▫️140-170 Katana Bakung Lelabah Merah
▫️170-200 2H Golok Pembasmi Naga / 1H Pedang Archanida
200-240 kostum pengelabu
▫️200-225 Baju Dara
▫️225-250 2H Pholidata


*List Leveling alchemy

0 - 10 : Revita I (nektar)
10 - 30 : Revita II (nektar)
30 - 50 : Revita III (nektar)
50 - 80 : Revita IV (nektar)
80 - 100 : Revita V (nektar)
100 - 150 : Nektar (madu enak)
    `;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".mapleveling") {
      const menuText = `
Daftar Tempat Leveling 1-280


Code: 

🔱 Boss

⚜️ Miniboss

🔰 Mobs

⛩️ Lokasi

🪻 Ramai/Favorit


Saran DTE: 

140 > 240 = Gelap + Bumi
240 > 280 = Bumi + Api


󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖󠇖1-30

🔰 Shell mask/Lavarca ⛩️ Gunung Nisel/Dataran rakau


25-40

🔰 Pova ⛩️ Ngarai Lonogo


40-55

🔰 Bone Dragonewt⛩️ Makam Ratu Kuno


55-62

🔰 Parasit Dog ⛩️ Kota Hilang: Area 2

🔱 Flare Volg (Hard) ⛩️ Lereng Merapi: Jejak 

Lava


62-79

🔰 Big mask ⛩️ Ngarai Haotas 🪻

🔱 Flare Volg (Nm) ⛩️ Lereng Merapi: Jejak Lava 🪻

🔱 Pendekar Bertopeng (Hard) ⛩️ Tanah Pertanian: Tanah Tinggi


75-90

⚜️Metal stinger ⛩️ Gurun akaku


79-95

🔱 Pendekar Bertopeng (NM) ⛩️ Tanah Pertanian: Tanah Tinggi 🪻


90-95

🔱 Flare Volg (Ulti) ⛩️ Lereng Merapi: Jejak Lava


95-112

🔱 Don Yeti ⛩️ Lembah Es Polde 🪻


103-115

🔱 Pendekar Bertopeng (Ulti) ⛩️ Tanah Pertanian: Tanah Tinggi


109-124

🔱 Cerberus (Nm) ⛩️ Mata Air

Kelahiran: Puncak 🪻


117-132

🔱 Dukun Lapin ⛩️ Sungai Kegelapan 🪻


128-146

🔱 Cerberus (Ulti) ⛩️ Mata Air Kelahiran: Puncak 🪻


145-150

🔱 Ifrid (Ulti) ⛩️ Graben Membara: Area Terdalam

🔱 Iconos (Ulti) Garis Pertahanan Artileri Otomatis (Bumi)

⚜️ Odelon Machina ⛩️ Pabrik Demi Machina Besar: Area 2

⚜️ Jamur Super Mampus ⛩️ Hutan Monster: Jalan Hewan (Gelap) 🪻


146-162

⚜️ Komandan Golem ⛩️ Mansion Lufenas: Pintu Masuk (Gelap) 🪻


162-178

🔱 Venena (Nm) ⛩️ Istana Ultimea: Takhta (Pilar : Gelap & Nena : Api) 🪻


174-182

🔱 Seele Zauga (Nm) ⛩️ Kuil Dewi Spesies

🔱 Machina Ultima (Ulti) ⛩️ Sekitar Alun-Alun Droma

⚜️ Altoblepas ⛩️ Dataran Rokoko 🪻


182-198

🔱 Venena (Ulti) ⛩️ Istana Ultimea: Takhta 🪻


198-205

🔱 Seele Zauga (Ulti) ⛩️ Kuil Dewi Spesies

⚜️ Violangkara ⛩️ Bongkahan Morthell: Area 3


199-214

🔱 Finstern (Ulti) ⛩️ Kuil Naga Kegelapan: Dekat Puncak (Gelap) 🪻


214-228

🔱 Kuzto (Ulti) ⛩️ Distrik Labilans: Alun-Alun (Bumi) 🪻

⚜️ Ketua Bandit Gurun ⛩️ Gurun Pasir Geist: Area 3 (Bumi)

⚜️ Ageladanios ⛩️ Pesisir Ducia: Area 1

⚜️ Pret ⛩️ Reruntuhan Erban Urban

⚜️Roh Orang Mati ⛩️ Lembah Arche : Area 1 (Gelap) 🪻

⚜️Ageladanious ⛩️ Pesisir Ducia: Area 1

🔱Gravicep (Ulti) ⛩️ Distrik Retecaula: Ujung


228-243

🔱Arachnidemon (Ulti)⛩️ Lembah Arche: Area Terdalam (Gelap) 🪻

⚜️Rhinosaurus ⛩️Rawa Danau Pelarian: Area 3 (Bumi)


232-247

⚜️Bullamius ⛩️ Gudang Material: Area 2 (Bumi) 🪻


240-256

🔱Gemma (Ulti) ⛩️Rawa Danau Pelarian: Ujung (Api)


243-259

🔱Ferzen si Naga Batu (Ulti) ⛩️Hutan Lindung: Pohon Raksasa (Bumi) 🪻


251-265

🔱Naga Penyamar Mimyugon (Nightmare) ⛩️ Zona kemudi : Area kokpit (Bumi) 🪻


256-270

⚜️Brassozard ⛩️ Zona kemudi : Area kontrol cuaca (Bumi) 🪻


262 - 277

🔱Naga Abu Merah Rudis (Hard) ⛩️ Kubah Espuma : Depan Gerbang (Bumi)


262 - 277

⚜️Trus ⛩️ Zona Mekanisme Penggerak: Tangki Daya (Api)


268-282

🔱Naga Membara Igneus (Ulti) ⛩️
Boma Moja: Pusat Desa (Api) : Area Bawah Tanah (Api)


268-282

⚜️Naga Membara Igneus (Ulti) ⛩️ 
Boma Moja: Village Center (Api)


264-279

🔱Golem Satpam (Ultimate) ⛩️
Kerongkongan Manusia Naga (Bumi)


271-285

🔱Naga Penyamar Mimyugon (Ulti) ⛩️ Zona kemudi : Area kokpit (Bumi)
    `;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".uptas") {
      const menuText = `
🔮🔮UP SLOT TAS KOLEKSI🔮🔮

💼50-51
  - Kulit Colon x1 [Colon : Tanah Pembangunan]

💼51-52
  - Kulit Berkualitas x1 [Lavarca : Dataran Rakau]

💼52-53
  - Spina x1.000

💼53-54
  - Kulit Minotaur x1 [Minotaur : Kuil Runtuh: Area Terlarang]
  - Pecahan Kristal Jingga x1 [Cobre : Danau Icule]

💼54-55
  - Kulit Anjing Hutan x1 [Anjing Hutan : Hutan Marbabo: Bagian Dalam]
  - Lencana Goblin x1 [Boss Goblin : Gua Ribisco: Bagian Dalam]

💼55-56
  - Spina x2.000

💼56-57
  - Bulu Mochelo x1 [Mochelo : Lereng Merapi A3]
  - Kain Linen x10 [Crow Killer : Dusun Douce]

💼57-58
  - Bulu Naga Giok x1 [Forestia : Tanah Kaos]
  - Tanduk Berkualitas x10 [Bandot : Tanah Tinggi Yorl]

💼58-59
  - Sabuk Bos Roga x1 [Boss Roga : Gua Bawah Tanah Saham: Ujung]
  - Kain Beludu x10 [Orc Petarung : Gua Bawah Tanah Saham]

💼59-60
  - Spina x4.000

💼60-61
  - Cakar Beruang x2 [Violaccoon : Padang Darkanon]
  - Sheeting Fabric x20 [Cassy : Makam Ratu Kuno: Area 2]

💼61-62
  - Rantai Kukuh x2 [Pendekar Bertopeng : Tanah Tinggi Pertanian]
  - Kain Polister x20 [Boneka Pengembara : Kota Hilang]

💼62-63
  - Sisik Naga Sabana x2 [Naga Sabana Yelb : Desa Albatif]
  - Kulit Serigala Alien x20 [Serigala Luar : Gerbang Dunia Lain: Area 1]

💼63-64
  - Spina x8.000

💼64-65
  - Jubah Sobek x2 [Goovua : Gurun Akaku: Bukit]
  - Kulit Tupai x20 [Rodentail : Maia Diela]

💼65-66
  - Tanduk Elang Zamrud x2 [Elang Zamrud : Teras Kerikil]
  - Bulu Kambing x20 [Koza : Jurang Dunkel]

💼66-67
  - Sayap Naga Senja x2 [Naga Senja : Benteng Solfini: Atap]
  - Bulu Halus x20 [Little Snow Boar : Lembah Es Polde]

💼67-68
  - Spina x16.000

💼68-69
  - Rantai Penyucian x2 [Cerberus : Mata Air Kelahiran: Puncak]
  - Kain Goyah x20 [Jewel Eye : Mata Air Kelahiran: Tengah]

💼69-70
  - Benang Aranea x2 [Aranea : Taman Sublimasi: Pusat]
  - Benang Laba-Laba Kecil x20 [Aramia : Taman Sublimasi: Area 2]

💼70-71
  - Kain Dewi Tiruan x3 [Imitacia : Istana Gelap: Aula Besar]
  - Kain Apung x10 [Flying Executioner : Buaian Prajurit]
  - Tapak Lembut x20 [Bunny Summoner : Sungai Kegelapan]

💼71-72
  - Surai Hewan Iblis x3 [Memecoleous : Istana Gelap: Area2]
  - Bantalan Tapak Keras x10 [Manticore : Istana Gelap: Area1]
  - Bulu Bayangan Hitam x20 [Shadow Fly : Istana Gelap: Area1]

💼72-73
  - Spina 32.000

💼73-74
  - Bulu Tapir x3 [Tapir : Graben Membara: Permukaan]
  - Bulu Kaku x10 [Wooly : Graben Membara: Permukaan]
  - Minyak Anti Karat x20 [Ornis Demi Machina : Garis Pertahanan Artileri Otomatis]

💼74-75
  - Kain Kuno x3 [Proto Leon : Reruntuhan Singolaire: Lantai 3]
  - Kulit Pohon Lunak x10 [Floral Bee : Situs Simcracker]
  - Rambut Potum Kotor x20 [Slum Potum : Klaspe Kumuh]

💼75-76
  - Tulang Raksasa Merah x3 [Dusk Machina : Pabrik Demi Machina Kecil: Area 2]
  - Mantel Hitam Sobek x10 [Rugos Demi Machina : Pabrik Demi Machina Kecil: Area 2]
  - Rantai Putus x20 [Machina Penyiksa : Pabrik Demi Machina Kecil: Area 2]

💼76-77
  - Sisik Chimera x3 [Mozto Machina : Pabrik Demi Machina Besar: Bagian Terdalam]
  - Benda Pendar Aneh x10 [Horn Machina : Pabrik Demi Machina Besar]
  - Tentakel Tangguh x20 [Ledon Machina : Pabrik Demi Machina Besar]

💼77-78
  - Spina x64.000

💼78-79
  - Jubah Roh Hutan x3 [Lalvada : Hutan Monster: Bagian Dalam]
  - Taring Tanaman x10 [Nepenthe : Hutan Monster]
  - Kain Felt x20 [Naga Boneka : Mansion Lufenas]

💼79-80
  - Aloi Lyark x3 [Gwaimol : Penjara Cuervo: Atap]
  - Baju Penjaga Robek x10 [Sipir Lyark : Penjara Cuervo: Lantai 2]
  - Kain Lembu x20 [Lyark Spesialis : Laboratorium Brahe: Area 2]

💼80-81
  - Kain Bercahaya x4 [Seraph Machina : Menara Penembus Bumi: Sisi Dalam]
  - Kulit Sintetis Rusak x20 [Lyark Brawler : Sekitar Alun-Alun Droma]
  - Cawat Pengeksekusi x20 [Volo : Sekitar Alun-Alun Droma Area 2]

💼81-82
  - Potongan Baju K. Kecil x4 [Venena : Istana Ultimea: Takhta]
  - Pecahan Zirah Keras x20 [High Tigris : Istana Ultimea Gudang Demi Machina]
  - Kulit Ular x20 [Ular Kolam : Reservoir Copia]

💼82-83
  - Spina x100.000

💼83-84
  - Kulit Mama Fluck x4 [Mama Fluck : Gua Pelupa]
  - Daun Besar Colon x20 [Leedle Colon : Dataran Rokoko]
  - Bulu Garis Vertikal x20 [Rakun Tambun : Hutan Curonne]

💼84-85
  - Kain Rohani Mardula x4 [Mardula : Serambi Dewa Berkah]
  - Kain Berkilau Misterius x20 [Malaikat Gelembung : Koridor Heresi/Kuil Para Dewa/Serambi Dewa Pembangunan/Serambi Dewa Istimewa]
  - Bulu Kelabu x20 [Haliabubo : Reruntuhan G. Mithurna: Koridor Atas]

💼85-86
  - Mantel Carbuncle x4 [Carbuncle : Serambi Dewa Pembangunan]
  - Kain Rajut x20 [Malaikat Gelembung : Koridor Heresi/Kuil Para Dewa/Serambi Dewa Pembangunan/Serambi Dewa Istimewa]
  - Ekor Beruang Berkantong x20 [Oddy : Kuil Para Dewa: Area 4/Serambi Dewa Pembangunan]

💼86-87
  - Bulu Raja Piton x4 [Raja Piton : Pegunungan Elf: Kuil]
  - Bulu Putih Lebat x20 [Bandot : Taman Es &Salju]
  - Bulu Abu Kaku x20 [Silveria : Pegunungan Elf]

💼87-88
  - Ingot Kuno x4 [Golem Preman : Kuil Naga Kegelapan: Tengah]
  - Taring Serigala Es x20 [Corloup : Pegunungan Elf]
  - Kain Gelap x20 [Soul Reaper : Kuil Naga Kegelapan]

💼88-89
  - Spina x200.000

💼89-90
  - Taring Tuscog x4 [Tuscog : Jalan Eryldan: Sekitar Hutan Ein]
  - Sutra Ulat x20 [Tikus Lumut : Hutan Ein]
  - Bulu Manusia Serigala x20 [Wolfret : Jalan Eryldan]

💼90-91
  - Serpihan Kayu Kuzto x5 [Kuzto : Distrik Labilans: Alun-Alun]
  - Bulu Cerpelai x20 [Satwal : Distrik Fabriska]
  - Sabuk Pinggang Misterius x30 [Moculus : Distrik Fractum: Area 1]

💼91-92
  - Kantong Kristal x5 [Nemopirania : Distrik Racetacula: Area 1]
  - Ekor Lembut x20 [Alpoa : Distrik Labilans: Area 3]
  - Papula Kuat x30 [Toksinaria : Distrik Racetacula: Area 1]

💼92-93
  - Sayap Repthon x5 [Repthon : Zona Riset Delzton: Area Terdalam]
  - Kancing Polong x20 [Colon Marquis : Reruntuhan Mansion Lufenas Tua]
  - Kain Perca Jas Panjang x30 [Gulingkar : Zona Riset Delzton: Area 1]

💼93-94
  - Rambut Kaisar Siluman x5 [Venena Metacoenubia : Neo Plastida]
  - Kain Merah Sobek x20 [Potum Bandit Gurun; Gurun Pasir Geist: Area 1] 
  - Kulit Karatan x30 [Jasman : Reruntuhan Elban Urban]

💼94-95
  - Spina x300.000

💼95-96
  - Tulang Pisteus x5 [Pisteus : Pesisir Ducia: Area Terdalam]
  - Kain Fantom x20 [Flooray : Dasar Tebing Lunagent]
  - Bulu Berang-Berang Laut x30 [Lutris : Pesisir Ducia: Area 3]

💼96-97
  - Sayap Arachnidemon x5 [Arachnidemon : Lembah Arche: Area Terdalam]
  - Belenggu Logam x20 [Besy : Lembah Arche]
  - Kulit Ular Aneh x30 [Coofer : Reruntuhan Kota Rokoko]

💼97-98
  - Jangat Berlendir x5 [Datuk Nezim : Lahan Basah Nezim]
  - Kain Enty x20 [Enty : Rimba Penyihir]
  - Poros Kokoh x30 [Orang2an Sawah Seram : Rimba Penyihir: Area 2]

💼98-99
  - Perca Gendam Geni x5 [Hexter : Rimba Penyihir: Area Terdalam]
  - Piring Kappa x20 [Kappadon : Lahan Basah Nezim]
  - Bulu Gagak x30 [Orang2an Sawah Seram : Rimba Penyihir: Area 2]

💼99-100
  - Inti Latebra Menggeliat x5 [Trocostida : Nov Diela: Area 1]
  - Cairan Lekat x20 [Juvestida : Nov Diela: Area 1]
  - Kulit Pelik x30 [Mata Jahat : Padang Morga: Area 1]
    `;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".levelingpet") {
      const menuText = `
🔮🔮LIST LEVELING PET🔮🔮

⚔Leveling Pet Level ️Lv1 -> lv40
» Pendekar Bertopeng (Normal) - Tanah Pertanian

⚔Leveling Pet Level ️Lv40 -> Lv46
» Pendekar Bertopeng (Hard) - Tanah Pertanian

⚔Leveling Pet Level ️Lv46 -> Lv72
» Pendekar Bertopeng (Nightmare) - Tanah Pertanian

⚔Leveling Pet Level ️Lv72 -> Lv102
»Pendekar Bertopeng (Ultimate) - Tanah Pertanian

⚔Leveling Pet Level ️Lv102 -> Lv160
» Cerberus (Ultimate) - Mata Air Kelahiran : Puncak

⚔Leveling Pet Level ️Lv160 -> Lv210
» Venena Coenubia (Ultimate) - Istana Ultimea

⚔Leveling Pet Level ️Lv210 -> Lv230
» Kuzto (Ultimate) - Distrik Labilans : Alun - Alun

⚔Leveling Pet Level ️Lv230 -> Lv260
» Ferzen Si Naga Batu (Ultimate) - Hutan Lindung : Pohon Raksasa

⚔Leveling Pet Level ️Lv260 -> Lv265
» Mimyugun Naga Penyamar (Ultimate) - Zona Kemudi : Area Kokpit
    `;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".bahanmq") {
      const menuText = `
List Bahan MQ by Kuro Castle Guild:

Sisik Naga, Hard Dragon Skin (2pcs)
Daging Domba, Lamb Meat (1pcs)
Sulur, Vine (3pcs)
Paruh Tebal, Thick Beak (3pcs)
Sayap Peri, Fairy Feather (3pcs)
Koin Ksatria, Swordsman Stone Coin (20pcs)
Kulit Kodok, Sand Frog Skin (5pcs)
Cakar Binatang buas, Beast Claw (3pcs)
Daging Tikus pasir, Sand Mole Meat (1pcs)
Taring Bergerigi, Jagged Fang (10pcs)
Kristal Saham, Saham Crystal (5pcs)
Permata Jiwa, Spiritual Gemstone (1pcs)
Anggur Rokoko, Rokoko grape (5pcs)
Kayu Labilans, Labilans Woods (10pcs)
Tanduk Patah, Broken Horn (20pcs)
Bijih Berkembang, Growing Ore (5pcs)
Batu Jabali, Jabali Stone (5pcs)
    `;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".counterele") {
      const menuText = `
Bumi lemah terhadap api
Api lemah terhadap air
Air lemah terhadap angin
Angin lemah terhadap bumi
Cahaya lemah terhadap gelap
Gelap lemah terhadap cahaya

Ele normal no counter karena netral :v
    `;
      await socket.sendMessage(
        chat.key.remoteJid,
        { text: menuText },
        { quoted: chat }
      );
    } else if (pesan === ".xtallup") {
      const menuText = `
📑XTALL UP LIST📑

🗡️Crysta Senjata 🗡️

 🔴 Pedang Sihir Iblis > Kristal Berlumur Darah
 🔴 Dukun Lapin > Momok Gelembung
 🔴 Golem Galian > Builder Golem
 🔴 Zahhak Machina > Penyihir Besi Bercakar> Naga meraung Bovinari
 🔴 Imitacia > Finstern si Naga Kegelapan > Oculasignio
🔴 Armasit > Florizard/Diark
🔴 Ganglef > Kepiting Bulan Besar
🔴 Ganglef > Machina Tiran > Vulture > Naga  Penyamar Mimyugon
🔴 Ksatria Buruk Dusta > Gwaimol > Hexter > Don Profundo
🔴 Potum Pahlawan > Potum Pahlawan II > Potum Pahlawan III> Potum Pahlawan IV
🔴 Iblis Kristal Jahanam > Shampy > Irestida> Vatudo
🔴 Imitator > Mardula > Velum
🔴 Sang Juara Megiston > Sang Juara Megiston II > Sang Juara Megiston III > Sang Juara Megiston IV > Sang Juara Megiston V > Sang Juara Megiston VI
🔴 Gerbang Iblis > Mozto Machina > Pisteus > Naga Jahat Fazzino
🔴 Pedang Neo Maton > Pedrio
🔴 Zolban > Rephton > Naga Trompet Reguita>Doreminador
🔴 Golem Pilar > Machina Ultima > Vlam si Naga Api
🔴 Mbah Dukun Usasama > Mbah Dukun Usasama II
🔴 Zega > Zega II > Zega III > Zega IV > Zega V > Zega VI > Zega VII
🔴 Pomie Chan > Pomie Chan II
🔴 Metasrigala > Cakar Kucing Kissatpam

🥋Crysta Zirah🥋

🟢 Tortuga > Daddy Finpen > Capo Profundo
🟢 Quasar Jahanam > Mata Jahanam
🟢 Kruztor > Kruztor II
🟢 Cerabes > Mimesia >  Sakura Merah Jelita > Baavgai
🟢 Boss Roga > Iconos > Ornlarf > Roga Safir > Ferzen si Naga Batu > Walican
🟢 Pilz Erosi > Filrocas
🟢 Golem Preman > Naga Langkisau
🟢 Cerberus > Pyxtica > Gemma> Meteora
🟢 Forestia > Glaucius
🟢 Colon Komandan > Goleps
🟢 Ifrid > Mama Fluck > Gordel
🟢 Noeliel > Noeliel si Patung Es Suci > Kucing Yule> Gegner
🟢 Elang Zamrud > Jamur Super Mampus
🟢 Usakichi > Usami > Usamochi
🟢 Gopherga > Yuveria
🟢 Sosok Jahat > Velly Hitam
🟢 DX Fighter > DX Fighter II
🟢 Dr. Leonardo > Dr. Leonardo II
🟢 Arachnidemon > Zapo
🟢 Tangan mulgoon

👑 Crysta Perkakas Tambahan 👑

🟡 Ayah Yashiro Azuki > ✝Raja Kegelapan✝
🟡 Biskuit Buatan Tangan > Alfenix
🟡 Ratu Kuno > Ratu Kuno II
🟡 Naga Senja > Baphomela > Bayangan Biru Tafakur
🟡 Warmonger > Proto Leon > Raja Piton > Naga Membara Igneus
🟡 Candela > Candela II > Amargon
🟡 Chocolate Ooze > Chocolate Ooze II 
🟡 Kapten Karatan > Exdocus
🟡 Iconos Emas > Felicitoad > Goldigem
🟡 Raja Kerbau > Pillow Kitagawa
🟡 Raja Kerbau > Paduka Raja Kerbau
🟡 Eidenliebe > Garnache
🟡 Pumpking > Jeila > Zoe > Zarth > Neewollah> Eripmav
🟡 Celeng Raksasa > Mega Alpoca
🟡 Naga Sabana Yelb > Roda Kelana > Neo Roda Kelana
🟡 Gespenst II > Stellar Ooze
🟡 Tengkorak Emas > Solopy
🟡 Seltirio > Tardigrademon
🟡 Dusk Machina > Trokostida
🟡 Adaro > Monster Bawah Laut
🟡 Naga Sabana Yelb > Roda Kelana > Gordo
🟡 Narumi Hina > Ibu Yashiro Azuki II

💍Crysta Perkakas Spesial💍

🟣 Viscum > Deniala > Amalgam > Crysmort> Breeta
🟣 Venena > Venena II> Humida
🟣 Baron Bling-Bling > Roh Orang Mati
🟣 Ooze > Lalvada > Dominaredor
🟣 Stone Mercenary > Memecoleous
🟣 Eerie Crystal > Kristal Misterius
🟣 Kristal Jahat > Tapir > Patissia > Sicanokami 
🟣 Violaccoon > Ketua Bandit Gurun
🟣 Dark Mushroom > Teertocrit
🟣 Bexiz > Zelbuse > Naga Milisi Turba
🟣 Volgagon > Etoise

💎Crysta Normal💎

🔵 Metal Stinger > Kapten Lyark Spesialis > Ageladanios
🔵 Crimsoch > Amoeba Machina
🔵 Flare Volg > Charugon
🔵 Naga Beringas Decel > York > Tuscog > Bayangan Hitam > Torexesa 
🔵 Aranea > Blazingur
🔵 Ksatriaja > Volotur > Brassozard
🔵 Gespenst > Salamander > Bullamius
🔵 Shawle > Dutannen
🔵 Nurethoth > Guignol > Golem Satpam
🔵 Radibat > Melancia
🔵 Nurethoth > Nuthoreth
🔵 Raja Potum > Potum Platinum
🔵 Minotaur > Rhinosaurus
🔵 Coryn Besar > Seraph Machina
🔵 Odelon Machina > Pret > Lilicarola
🔵 Bos Petapa Kadal > Orictoceras
🔵 Gravicep > Naga Abu Merah Rudis
    `;
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
