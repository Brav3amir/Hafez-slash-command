const { SlashCommandBuilder } = require("@discordjs/builders");
const { client, db, config } = require("../../index.js");
const { MessageActionRow, MessageButton } = require("discord.js");

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

    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setEmoji("<:108460200:953704522746839091>")
        .setURL(`https://discord.gg/mqrRGbRaEk`)
        .setLabel("Support Server")
        .setStyle("LINK")
    )

    let FIELDS = [
      {
        name: "<:invisible:907558638040784946> Server  Count",
        value:
          "<:874678195843125278:986605051395063818>`Active in " +
          client.guilds.cache.size +
          " Guilds`\n",
        inline: false,
      },
      {
        name: "<:red_bot:953283780930600970> Channel Count",
        value:
          "<:874678195843125278:986605051395063818>`Active in " +
          client.channels.cache.size +
          " Channels`\n",
        inline: false,
      },
      {
        name: "<:blue_bot:953698852479832094> Member Count",
        value:
          "<:874678195843125278:986605051395063818>`Active for " +
          client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) +
          " Members`\n",
        inline: false,
      },
      {
        name: "<:green_bot:953283530610327562> Latency",
        value:
          "<:874678195843125278:986605051395063818>`" +
          Math.round(client.ws.ping) +
          " ms`\n",
        inline: false,
      },
      {
        name: "<:idle:907558638003036180> Uptime",
        value: `<:874678195843125278:986605051395063818> \`${uptime}\``,
        inline: false,
      },
      {
        name: "<:dev_badge:949944176458494022> Dev",
        value: "<:874678195843125278:986605051395063818>`" + "Amir#3335, '予𝑳𝒖̄𝒅𝒉𝒐 𝑹𝒊𝒁𝒊ᵏᵒ#1700`",
        inline: false,
      },
    ];

    // if (interaction.db.usage && Object.keys(interaction.db.usage).length > 2) {
    //   let list = [];
    //   Object.entries(interaction.db.usage)
    //     .map((entry) => `\`${entry[0]}: ${entry[1]}\``)
    //     .forEach((item) => list.push(item));
    //   FIELDS.push({
    //     name: "<:online:907558638292459560> Server Commands Usage:",
    //     value: list.join(", "),
    //     inline: false,
    //   });
    // }

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
      components: [row],
    });

    let current = interaction.db?.usage?.botinfo || 0;
    db.set(interaction.guild.id, "usage.botinfo", current + 1);
  },
};
