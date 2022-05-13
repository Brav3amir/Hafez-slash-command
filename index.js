// Util
const ora = require("ora");
const config = require("./config");
const fs = require("fs");

require("dotenv").config();

// Slash Commands
const { Client, Collection, WebhookClient } = require("discord.js");
const slash = require("./src/util/slash");

// CLI
const intentsLoader = ora("Registering Intents").start();

// Checks
let finalIntents = [];
if (!Array.isArray(config.bot.intents)) {
  intentsLoader.warn(
    "Intents in config file must be in an array, default intents will be used"
  );
} else {
  finalIntents = config.bot.intents;
  intentsLoader.succeed("Loaded intents successfully from the config file");
}

const client = new Client({ intents: finalIntents });

module.exports.client = client; // exporting client
module.exports.Webhooks = [
  new WebhookClient({ url: process.env.URL }),
  new WebhookClient({ id: process.env.ID1, token: process.env.WBtoken1 }),
  new WebhookClient({ id: process.env.ID2, token: process.env.WBtoken2 }),
];
module.exports.config = config;
module.exports.db = require("./src/util/functions.js");

// Commands
client.commands = new Collection();

const events = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

events.forEach((event) => {
  const eventFile = require(`./src/events/${event}`);
  if (eventFile.oneTime) {
    client.once(eventFile.event, (...args) => eventFile.run(...args));
  } else {
    client.on(eventFile.event, (...args) => eventFile.run(...args));
  }
});

//top.gg
const { AutoPoster } = require("topgg-autoposter");
AutoPoster(process.env.posterToken, client); // your discord.js or eris client

client.login(config.bot.token);
