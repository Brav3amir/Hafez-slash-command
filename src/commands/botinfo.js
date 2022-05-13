const { SlashCommandBuilder } = require("@discordjs/builders");
const { client, db, config } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Fal Hafez stats"),
  run: async (interaction) => {
    let totalSeconds = client.uptime / 1000;
    let days = Math.round(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.round(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.round(totalSeconds / 60);
    let seconds = Math.round(totalSeconds);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    // class Usage {
    //   constructor(DB) {
    //     this.inline = true;
    //     this.name = DB[0];
    //     this.value = DB[1].toString();
    //   }
    // }

    let FIELDS = [
      {
        name: "<:invisible:907558638040784946> Server  Count",
        value:
          "<:space:874678195843125278>`Active in " +
          client.guilds.cache.size +
          " Guilds`\n",
        inline: false,
      },
      {
        name: "<:red_bot:953283780930600970> Channel Count",
        value:
          "<:space:874678195843125278>`Active in " +
          client.channels.cache.size +
          " Channels`\n",
        inline: false,
      },
      {
        name: "<:blue_bot:953698852479832094> Member Count",
        value:
          "<:space:874678195843125278>`Active for " +
          client.users.cache.size +
          " Members`\n",
        inline: false,
      },
      {
        name: "<:green_bot:953283530610327562> Latency",
        value:
          "<:space:874678195843125278>`" +
          Math.round(client.ws.ping) +
          " ms`\n",
        inline: false,
      },
      {
        name: "<:dev_badge:949944176458494022> Dev",
        value: "<:space:874678195843125278>`" + "Amir -#7194, Ludho#0001`",
        inline: false,
      },
      {
        name: "<:idle:907558638003036180> Uptime",
        value: `<:space:874678195843125278> \`${uptime}\``,
        inline: false,
      },
    ];

    if (interaction.db.usage && Object.keys(interaction.db.usage).length > 2) {
      let list = [];
      Object.entries(interaction.db.usage)
        .map((entry) => `\`${entry[0]}: ${entry[1]}\``)
        .forEach((item) => list.push(item));
      FIELDS.push({
        name: "<:online:907558638292459560> Server Commands Usage:",
        value: list.join(", "),
        inline: false,
      });
    }

    await interaction.reply({
      embeds: [
        {
          color: "#fffff0",
          title: "Fal Hafez Stats",
          thumbnail: {
            url: client.user.displayAvatarURL(),
          },
          fields: [FIELDS],
          footer: {
            text: "Fal Hafez | " + config.bot.version,
          },
        },
      ],
    });

    let current = interaction.db?.usage?.botinfo || 0;
    db.set(interaction.guild.id, "usage.botinfo", current + 1);
  },
};
