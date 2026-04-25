const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let streamActive = false;
let currentCode = "";
const XP_REWARD = 100;

const xp = {};

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const args = message.content.split(" ");

  if (message.content === "!stream on") {
    streamActive = true;
    message.channel.send("🔴 Stream ON");
  }

  if (message.content === "!stream off") {
    streamActive = false;
    currentCode = "";
    message.channel.send("⚫ Stream OFF");
  }

  if (args[0] === "!streamcode" && args[1] && streamActive) {
    currentCode = args[1];
    message.channel.send("🎮 Code set");
  }

  if (args[0] === "!streamcode" && args[1]) {
    if (!streamActive) return;

    if (args[1] === currentCode) {
      if (!xp[message.author.id]) xp[message.author.id] = 0;

      xp[message.author.id] += XP_REWARD;

      message.reply(`+${XP_REWARD} XP 🎉`);
    }
  }
});

client.login(process.env.TOKEN);
