const { createCanvas, loadImage } = require("canvas");
const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "welcome",
    version: "9.0",
    author: "〲MAMUNツ࿐ T.T　o.O",
    category: "events"
  },

  onStart: async ({ event, api, threadsData, usersData, message }) => {
    try {
      if (event.logMessageType !== "log:subscribe") return;

      const { threadID } = event;
      const threadData = await threadsData.get(threadID);
      if (!threadData?.settings?.sendWelcomeMessage) return;

      const threadInfo = await api.getThreadInfo(threadID);
      const groupName = threadInfo.threadName || "Group";

      const added = event.logMessageData.addedParticipants || [];

      const welcomeText = `🌺💑 ᏔᎬᏞᏟϴᎷᎬ 🌺💑

🥰 {userTag}
💖 Welcome to ${groupName}

🥀 আশা করছি আপনি আপনার মূল্যবান সময় আমাদের দিবেন 💕`;

      for (const user of added) {
        const userID = user.userFbId;
        const botID = api.getCurrentUserID();

        if (userID == botID) {
          return message.send("🤖 Thanks for adding me!\nUse /help");
        }

        const userName = user.fullName || "New Member";
        const inviterName = await usersData.getName(event.author) || "Unknown";
        const memberCount = event.participantIDs?.length || 0;

        const imgPath = await createCard({
          userID,
          userName,
          inviterName,
          memberCount,
          groupName,
          api
        });

        await message.send({
          body: welcomeText.replace("{userTag}", userName),
          mentions: [{ tag: userName, id: userID }],
          attachment: fs.createReadStream(imgPath)
        });

        setTimeout(() => {
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }, 8000);
      }

    } catch (e) {
      console.log("❌ Welcome Error:", e);
    }
  }
};

// 👤 Avatar
async function getAvatar(userID, api) {
  try {
    const info = await api.getUserInfo([userID]);
    const url = info[userID]?.thumbSrc;
    if (!url) return null;

    const res = await axios({
      url,
      method: "GET",
      responseType: "arraybuffer"
    });

    return Buffer.from(res.data, "binary");
  } catch {
    return null;
  }
}

// 🎨 CARD DESIGN
async function createCard({ userID, userName, inviterName, memberCount, groupName, api }) {
  const width = 900;
  const height = 500;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // 🌌 Neon BG
  const grd = ctx.createLinearGradient(0, 0, width, height);
  grd.addColorStop(0, "#0f0c29");
  grd.addColorStop(1, "#302b63");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);

  // ✨ Glow dots
  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.beginPath();
    ctx.arc(Math.random()*width, Math.random()*height, 2, 0, Math.PI*2);
    ctx.fill();
  }

  // 👤 Avatar
  const avatarBuffer = await getAvatar(userID, api);
  let avatar;
  if (avatarBuffer) avatar = await loadImage(avatarBuffer);

  const x = width / 2;
  const y = 180;
  const size = 95;

  // 🔵 Glow ring
  ctx.beginPath();
  ctx.arc(x, y, size + 12, 0, Math.PI * 2);
  ctx.strokeStyle = "#00f7ff";
  ctx.lineWidth = 6;
  ctx.shadowBlur = 30;
  ctx.shadowColor = "#00f7ff";
  ctx.stroke();
  ctx.shadowBlur = 0;

  if (avatar) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(avatar, x - size, y - size, size * 2, size * 2);
    ctx.restore();
  }

  // 📝 TEXT
  ctx.textAlign = "center";

  // WELCOME
  ctx.font = "bold 45px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("WELCOME", width / 2, 70);

  // 🌈 Group Name Glow
  ctx.font = "bold 28px Arial";
  ctx.fillStyle = "#ff66cc";
  ctx.shadowColor = "#ff66cc";
  ctx.shadowBlur = 20;
  ctx.fillText(groupName, width / 2, 110);
  ctx.shadowBlur = 0;

  // User name
  ctx.font = "bold 32px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(userName, width / 2, 320);

  // Added by
  ctx.font = "24px Arial";
  ctx.fillStyle = "#00f7ff";
  ctx.fillText(`Added by ${inviterName}`, width / 2, 360);

  // Member count
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`Member #${memberCount}`, width / 2, 400);

  // Save
  const imgPath = path.join(__dirname, `welcome_${userID}_${Date.now()}.png`);
  await fs.writeFile(imgPath, canvas.toBuffer());

  return imgPath;
            }
