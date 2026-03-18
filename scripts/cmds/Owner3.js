const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
      name: "owner3",
          version: "1.3.0",
              author: "〲MAMUNツ࿐ T.T　o.O",
                  role: 0,
                      shortDescription: "Owner information with image",
                          category: "Information",
                              guide: {
                                    en: "owner"
                                        }
                                          },
  onStart: async function ({ api, event }) {
      const ownerText = 
      `⏤͟͟͞͞𝙊𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢  ☺︎
                   ⏤͟͟͞͞𝑃𝐴𝐾𝐻𝐼 𝐵𝐵𝑍 ☺︎ ┏━━━━━━━━━━━━━━━━━━
                     ⏤͟͟͞͞𝐍𝐚𝐦𝐞 ➯⏤͟͟͞͞ 𝐏𝐚𝐤𝐡𝐢 𝐁𝐛𝐳 ᜊ🐱
                     
⏤͟͟͞͞𝐍𝐢𝐜𝐤𝐧𝐚𝐦𝐞 ➯⏤͟͟͞͞ 𝐏ᴀᴋʜɪ 😗

⏤͟͟͞͞𝐂𝐨𝐮𝐧𝐭𝐫𝐲 ➯⏤͟͟͞͞𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡 🇧🇩

🏤⏤͟͟͞͞𝐇𝐨𝐦𝐞 ➯⏤͟͟͞͞𝐑𝐚𝐧𝐠𝐩𝐮𝐫 🎀☠️

🏛️⏤͟͟͞͞𝐃𝐢𝐬𝐭𝐫𝐢𝐜𝐭 ➯⏤͟͟͞͞𝐑𝐚𝐧𝐠𝐩𝐮𝐫 💀

⛪⏤͟͟͞͞𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 ➯𝟏𝟎  𝐏𝐢𝐜𝐜𝐡𝐢 🐱

⏤͟͟͞͞𝐀𝐠𝐞 ➯ 𝟏𝟔 🐱💔🫶🏻

🕌⏤͟͟͞͞𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 ➯ 𝐈𝐬𝐥𝐚𝐦 ❤️🖤♡♡

⏤͟͟͞͞𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 ➯ 𝐀𝐤𝐝𝐢𝐧 𝐡𝐨𝐢𝐛𝐨 ‍♡

⏤͟͟͞͞𝐁𝐢𝐫𝐭𝐡 𝐎𝐟 𝐃𝐚𝐲➯𝟎'𝟏⏤͟͟͞͞𝐎𝐜𝐭𝐨𝐛𝐞𝐫 🎂🍰🍫🍥🧁

⏤͟͟͞͞𝐁𝐞𝐬𝐭 𝐅𝐧𝐝➯ 𝐂𝐡𝐢𝐥𝐨 𝐛𝐮𝐭 𝐚𝐤𝐡𝐨𝐧 𝐧𝐚𝐢 ,,🙃

⏤͟͟͞͞𝐅𝐯𝐭 𝐂𝐨𝐥𝐨𝐮𝐫➯ ⏤͟͟͞͞𝐁𝐥𝐚𝐜𝐤 😺🖤

⏤͟͟͞͞𝐅𝐯𝐭 𝐌𝐚𝐧➯ ^᪲᪲᪲𝐀𝐠𝐞 𝐜𝐡𝐢𝐥𝐨 𝐚𝐤𝐡𝐨𝐧 𝐧𝐚𝐢 ^᪲🎀

⏤͟͟͞͞𝐅𝐯𝐭 𝐄𝐦𝐨𝐣𝐢 ➯ 🙂☠️🙃🌚💋👀
            
⏤͟͟͞͞𝐇𝐞𝐢𝐠𝐡𝐭 ➯ 𝟓. 𝟎𝟐 ☺︎

⏤͟͟͞͞𝐶𝐴𝐻𝑇 𝐵𝑂𝑇  ⏤͟͟͞͞𝑃𝐴𝐾𝐻𝐼 𝐵𝐵𝑍 ☻
               ⏤͟͟͞͞𝑂𝑊𝑁𝐸𝑅⏤☺︎`;
    const cacheDir = path.join(__dirname, "cache");
        const imgPath = path.join(cacheDir, "owner.jpg");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);
    const imgLink = "https://i.imgur.com/0xLvtcb.jpeg";
    const send = () => {
          api.sendMessage(
                  {
                            body: ownerText,
                                      attachment: fs.createReadStream(imgPath)
                                              },
                                                      event.threadID,
                                                              () => fs.unlinkSync(imgPath),
                                                                      event.messageID
                                                                            );
                                                                                };
    request(encodeURI(imgLink))
          .pipe(fs.createWriteStream(imgPath))
                .on("close", send);
                  }
                  };
