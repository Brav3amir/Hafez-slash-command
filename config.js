const { Intents } = require("discord.js");
require("dotenv").config();

const config = {
  bot: {
    token: process.env.token,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], // You can find the available intents on https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS
    guildId: "854044193811202108", // Update this field to only register commands a guild, this will make the commands to load instantly in the selected guild (Optional)
    id: "860647959493345312",
    version: "v1.2.2",
    prefix: "?",
    api: process.env.api,
    key: process.env.key,
  },
};

module.exports = config;
