const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "keya",
    version: "1.0.1",
    author: "〲MAMUNツ࿐ T.T　o.O",
    role: 0,
    shortDescription: "Keya Profile Card",
    category: "Information",
    guide: {
      en: "type keya"
    }
  },

  onStart: async function ({ api, event }) {

    const profileText = 
`╔══════════════════════════════════╗
║      🌌✨ PROFILE CARD ✨🌌      ║
╠══════════════════════════════════╣

🌟 Name      : 〲KEYA ツ࿐ T.T o.O

🎂 Age       : 17+

🆔 FF ID     : 3246615019

💌 Status    : MAMUN ER WIFE 💖

📍 Location  : Rajshahi, Bangladesh

🎮 Hobbies   : Gaming 🎮 | Adda | Music 🎶

╠══════════════════════════════════╣

🔗 Social Info:
• WhatsApp : jamai pitabe 😆
• TikTok   : calai nh ❌

🎯 Favorite Game:
• Free Fire 🔫

╚══════════════════════════════════╝`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "keya.jpg");

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const imgLink = "https://i.imgur.com/ACbFtbL.jpeg";

    const sendMsg = () => {
      api.sendMessage(
        {
          body: profileText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", sendMsg);
  }
};
