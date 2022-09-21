const { Intents } = require("discord.js");
require("dotenv").config();

const config = {
  bot: {
    token: process.env.token,
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ], // You can find the available intents on https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS
    guildId: "", // Update this field to only register commands a guild, this will make the commands to load instantly in the selected guild (Optional)
    id: "860647959493345312",
    version: "v1.3.0",
    prefix: "?",
    api: process.env.api,
    key: process.env.key,
  },
};

module.exports = config;
