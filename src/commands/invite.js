const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("../Database/functions.js");
const { client } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("bot's invite link"),
  run: async (interaction) => {
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setURL(
            `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=137439861953&scope=bot%20applications.commands`
          )
          .setLabel("Invite Link")
          .setStyle("LINK")
      )
      .addComponents(
        new MessageButton()
          .setURL(`https://discord.gg/yHfjnCsJ38`)
          .setLabel("Support Server")
          .setStyle("LINK")
      );

    if (interaction.db.language === "en") {
      interaction.reply({
        embeds: [
          {
            color: "#fffff0",
            title: "📔 **Invite Page** 📔",
            fields: [
              {
                name: "Invite the bot 🔗",
                value: `[Fal Hafez Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=137439861953&scope=bot%20applications.commands)`,
              },
              {
                name: "Support Server 🔗",
                value: "[Support Server Invite](https://discord.gg/yHfjnCsJ38)",
              },
            ],
            footer: {
              text: " Requested by: " + interaction.user.tag,
              icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
            },
          },
        ],
        components: [row],
      });
    } else if (interaction.db.language === "fa") {
      interaction.reply({
        embeds: [
          {
            color: "#fffff0",
            title: "📔 **صفحه اینوایت** 📔",
            fields: [
              {
                name: "لینک اینوایت من 🔗",
                value: `[Fal Hafez Invite](https://discord.com/api/oauth2/authorize?client_id=${"860647959493345312"}&permissions=137439861953&scope=bot%20applications.commands)`,
              },
              {
                name: "لینک اینوایت سرور پشتیبانی 🔗",
                value: "[Support Server Invite](https://discord.gg/yHfjnCsJ38)",
              },
            ],
            footer: {
              text: " : درخواست شده توسط " + interaction.user.tag,
              icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
            },
          },
        ],
        components: [row],
      });
    }

    let current = interaction.db.usage?.invite || 0;
  //  db.set(interaction.guild.id, "usage.invite", current + 1);
  },
};
