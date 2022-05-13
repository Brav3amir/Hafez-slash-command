const { client, Webhooks, db } = require("../../index.js");

module.exports = {
  event: "guildDelete",
  oneTime: false,
  run: async (guild) => {
    if (guild.id == "906938940618051655") return;

    db.delete(guild.id);

    const guildICON =
      guild.iconURL({ dynamic: true }) ||
      "https://cdn.discordapp.com/attachments/916778395558371338/916792163206037504/unnamed.png";

    const webhookClient2 = Webhooks[1];
    const webhookClient1 = Webhooks[2];

    webhookClient2.send({
      embeds: [
        {
          embeds: [
            {
              color: "#ff0000",
              author: {
                name: guild.name,
                icon_url: guildICON,
              },
              description: "**The bot was removed from a server**",
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
        },
      ],
    });
    webhookClient1.send({
      embeds: [
        {
          color: "#ff0000",
          author: {
            name: guild.name,
            icon_url: guildICON,
          },
          description:
            "<:red_bot:953283780930600970> **The bot was removed from a server**",
          thumbnail: {
            url: guildICON,
          },
          timestamp: new Date(),
        },
      ],
    });
  },
};
