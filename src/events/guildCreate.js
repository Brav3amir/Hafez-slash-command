const { client, Webhooks, db } = require("../../index.js");

module.exports = {
  event: "guildCreate",
  oneTime: false,
  run: async (guild) => {
    db.create(guild.id);
    setTimeout(() => {
      db.set(guild.id, "language", "fa");
    }, 2000);

    const guildICON =
      guild.iconURL({ dynamic: true }) ||
      "https://cdn.discordapp.com/attachments/916778395558371338/916792163206037504/unnamed.png";

    const joinguildpv = Webhooks[1];
    const joinguild = Webhooks[2];

    joinguildpv.send({
      embeds: [
        {
          color: "#13ff00",
          author: {
            name: guild.name,
            icon_url: guildICON,
          },
          description: "**The bot was added from a server**",
          thumbnail: {
            url: guildICON,
          },
          fields: [
            {
              name: "<:green_bot:953283530610327562> Server Name",
              value: `<:space:874678195843125278> ${guild.name}`,
            },
            {
              name: "<:green_bot:953283530610327562> Server Create At :",
              value: `<:space:874678195843125278> ${guild.createdAt.toDateString()}`,
              inline: false,
            },
            {
              name: "<:green_bot:953283530610327562> Server Owner :",
              value: `<:space:874678195843125278> ${await guild.fetchOwner()}`,
              inline: true,
            },
            {
              name: "<:green_bot:953283530610327562> Server ID",
              value: `<:space:874678195843125278>${guild.id}`,
              inline: true,
            },
            {
              name: "<:green_bot:953283530610327562> Member Count",
              value: `<:space:874678195843125278>${guild.memberCount}`,
              inline: true,
            },
            {
              name: "<:green_bot:953283530610327562> Active In",
              value: `<:space:874678195843125278>${client.guilds.cache.size}`,
              inline: true,
            },
          ],
          timestamp: new Date(),
        },
      ],
    });

    joinguild.send({
      embeds: [
        {
          color: "#13ff00",
          author: {
            name: guild.name,
            icon_url: guildICON,
          },
          description:
            "<:green_bot:953283530610327562> **The bot was added from a server**",
          thumbnail: {
            url: guildICON,
          },
          timestamp: new Date(),
        },
      ],
    });
  },
};
