const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
const { client, db, config } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("bot's invite link"),
  run: async (interaction) => {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setEmoji("<:link_1f517:953703104531026000>")
          .setURL(
            `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=137439861953&scope=bot%20applications.commands`
          )
          .setLabel("Invite Link")
          .setStyle("LINK")
      )
      .addComponents(
        new MessageButton()
          .setEmoji("<:108460200:953704522746839091>")
          .setURL(`https://discord.gg/yHfjnCsJ38`)
          .setLabel("Support Server")
          .setStyle("LINK")
      )
      .addComponents(
        new MessageButton()
          .setEmoji("<:1647453161948:953713506673385512>")
          .setURL(`https://top.gg/bot/860647959493345312/vote`)
          .setLabel("Vote Top.gg")
          .setStyle("LINK")
      );

    await interaction.reply({
      embeds: [
        {
          color: "#fffff0",
          author: {
            name: "Do You Want To Invite me?",
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          },
          fields: [
            {
              name: `<:blue_bot:953698852479832094> Invite Fal Hafez Bot`,
              value: `<:space:874678195843125278> [Invite Link](https://discord.com/api/oauth2/authorize?client_id=860647959493345312&permissions=137439861953&scope=bot%20applications.commands)`,
            },
            {
              name: `<:blue_bot:953698852479832094> Support Server`,
              value: `<:space:874678195843125278> [Server Support](https://discord.gg/ErzJGBBm48)`,
            },
          ],
          image: {
            url: "https://cdn.discordapp.com/attachments/916778395558371338/953734570656796762/ezgif-1-04fd605c59.gif",
          },
          footer: {
            text: "Fal Hafez | " + config.bot.version,
          },
        },
      ],
      components: [row],
    });

    let current = interaction.db.usage?.invite || 0;
    db.set(interaction.guild.id, "usage.invite", current + 1);
  },
};
