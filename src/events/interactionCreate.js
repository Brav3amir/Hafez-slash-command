const fs = require("fs");
const { client, Webhooks } = require("../../index.js");

module.exports = {
  event: "interactionCreate", // Name of the event
  oneTime: false, // If set to true the event will only be fired once until the client is restarted
  run: async (i) => {
    if (!i.isCommand()) return;

    delete require.cache[require.resolve(`../../db/server/${i.guild.id}.json`)];

    const commandCheck = i.client.commands.get(i.commandName);
    // if (fs.existsSync(`../../db/server/${i.guild.id}.json`)) {
    i.db = require(`../../db/server/${i.guild.id}.json`);
    // } else {
    //   i.db = { language: "fa" };
    // }

    if (!commandCheck) {
      console.log(`Could not find command" '${i.commandName}'`);
      return i.reply({
        content: `There was an error while executing this command!\nAsk Developers In : https://discord.gg/ErzJGBBm48`,
        ephemeral: true,
      });
    } else await commandCheck.run(i);

    txt =
      "Command : " +
      "\n`" +
      i.commandName +
      "`\n" +
      "\nGuild : " +
      "\n`" +
      i.guild.name +
      "`\n" +
      "\nGuild Id : " +
      "\n`" +
      i.guild.id +
      "`\n" +
      "\n Guild Members : " +
      "\n`" +
      i.guild.memberCount +
      "`\n" +
      "\nChannel : " +
      "\n`" +
      i.channel.name +
      "`\n" +
      "\nUser " +
      "\n`" +
      i.user.tag +
      "`";

    try {
      if (!i.guild) return;
      Webhooks[0].send({
        embeds: [
          {
            description: txt,
            title: `${client.user.tag} Command log`,
            color: "#fffff0",
          },
        ],
      });
    } catch (error) {
      Webhooks[0].send("```\n" + error + "\n```");
      return i.reply({
        content: `There was an error while executing this command!\nAsk Developers In : https://discord.gg/ErzJGBBm48`,
        ephemeral: true,
      });
    }
  },
};
