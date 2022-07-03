const { SlashCommandBuilder } = require("@discordjs/builders");
const { client, db, config } = require("../../index.js");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("help command"),
  
  run: async (interaction) => {
    const p = "/";

    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setEmoji("<:108460200:953704522746839091>")
        .setURL(`https://discord.gg/mqrRGbRaEk`)
        .setLabel("Support Server")
        .setStyle("LINK")
    )

    if (interaction.db.language === "en") {
      interaction.reply({
        embeds: [
          {
            author: {
              name: "Fal Hafez Help Menu 💡",
              iconURL: client.user.displayAvatarURL(),
            },
            color: "#fffff0",
            description: `**<:red_bot:953283780930600970> Hafez Omen :**\n<:905830383562670091:953919564385746994> \`${p}fal\`\n\n **<:red_bot:953283780930600970> Hafez Poems :**\n <:905830383562670091:953919564385746994> \`${p}ghazal\`\n\n **<:red_bot:953283780930600970> Hafez Pictures :**\n<:905830383562670091:953919564385746994> \`${p}pic\`\n\n **🕊️ Hafez Biography :**\n<:905830383562670091:953919564385746994> \`${p}bio\`\n\n **<:blue_bot:953698852479832094> Invite Link :**\n<:865002283934154774:953921756664582204> \`${p}invite\`\n\n**<:blue_bot:953698852479832094> Bot language :**\n<:865002283934154774:953921756664582204> \`${p}language <English | Persian>\`\n\n **<:blue_bot:953698852479832094> Bot Information :**\n<:865002283934154774:953921756664582204> \`${p}stats\`\n\n`,
            footer: {
              text: "Fal Hafez | " + config.bot.version,
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
            title: "صفحه راهنمایی💡",
            description: `**: فال حافظ <:red_bot:953283780930600970>**\n<:905830383562670091:953919564385746994> \`${p}fal\`\n\n **: غزلیات حافظ <:red_bot:953283780930600970>**\n<:905830383562670091:953919564385746994> \`${p}ghazal\` \n\n **: عکس های حافظ <:red_bot:953283780930600970>**\n<:905830383562670091:953919564385746994> \`${p}pic\` \n\n **: زندگی نامه حافظ 🕊️**\n<:905830383562670091:953919564385746994> \`${p}bio\`\n\n **: لینک دعوت  <:blue_bot:953698852479832094>**\n<:865002283934154774:953921756664582204> \`${p}invite\`\n\n**: زبان بات <:blue_bot:953698852479832094>**\n<:865002283934154774:953921756664582204> \`${p}language <English | Persian>\` \n\n **: اطلاعات بات <:blue_bot:953698852479832094>**\n<:865002283934154774:953921756664582204> \`${p}stats\`\n\n`,
            footer: {
              text: "Fal Hafez | " + config.bot.version,
            },
          },
        ],
        components: [row],
      });
    }
    
    let current = interaction.db.usage?.help || 0;
    db.set(interaction.guild.id, "usage.help", current + 1);
  },
};
