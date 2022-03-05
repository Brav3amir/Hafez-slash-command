const { Intents } = require("discord.js");

const config = {
  bot: {
    token: "ODY3MTA3MjYxNzM3ODYxMTQw.YPcSkQ.DYuZZhQtA8KYyQNnjzRbCwKKSDE",
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
    ], // You can find the available intents on https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS
    //guildId: "854044193811202108", // Update this field to only register commands a guild, this will make the commands to load instantly in the selected gulld (Optional)
    id: "867107261737861140",
    prefix: "?",
  },
};

module.exports = config;
