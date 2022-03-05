const fs = require("fs");

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
      return console.log(`Could not find command" '${i.commandName}'`);
    } else {
      await commandCheck.run(i);
    }
  },
};
