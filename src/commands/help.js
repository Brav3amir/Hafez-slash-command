const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const db = require("../Database/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("help command"),
  run: async (interaction) => {
    const p = "/";

    var number_random = Math.floor(Math.random() * 495);
    let getInfo = async () => {
      let response = await axios.get(`https://api.falehafez.org/`);
      let info = response.data;
      return info;
    };
    let data = await getInfo();
    let poem = `${data.poem[0]} — ${data.poem[1]}\n${data.poem[2]} — ${data.poem[3]}\n${data.poem[4]} — ${data.poem[5]}`;
    let explanation = `${data.explanation}`;

    if (interaction.db.language === "en") {
      interaction.reply({
        embeds: [
          {
            color: "#fffff0",
            title: " **Help Page** 💡",
            description: `**📔 Hafez Omen :**\n \`${p}fal\`\n\n **🎶 Hafez Poems :**\n \`${p}ghazaliat\`\n\n **🖼️ Hafez Pictures :**\n \`${p}picture\`\n\n **🕊️ Hafez Biography :**\n \`${p}bio\`\n\n **Invite Link :**\n \`${p}invite\`\n\n**🌐 Bot language :**\n \`${p}language <en | fa>\`\n\n **🤖 Bot Information :**\n \`${p}info\`\n\n[Support Server](https://discord.gg/ErzJGBBm48) | [Copyright](https://github.com/im-parsa/hafez-bot)`,
            footer: {
              text: " Requested by: " + interaction.user.tag,
              icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
            },
          },
        ],
      });
    } else if (interaction.db.language === "fa") {
      interaction.reply({
        embeds: [
          {
            color: "#fffff0",
            title: "💡 **صفحه راهنمایی** ",
            description: `**: فال حافظ 📔**\n \`${p}fal\`\n\n **: غزلیات حافظ 🎶**\n \`${p}ghazal\` \n\n **: عکس های حافظ 🖼️**\n \`${p}pic\` \n\n **: زندگی نامه حافظ 🕊️**\n \`${p}bio\`\n\n **: لینک دعوت  <:851533117273276496:906970682498359317>  **\n \`${p}invite\`\n\n**: زبان بات 🌐**\n \`${p}language <English | Persian>\` \n\n **: اطلاعات بات 🤖**\n \`${p}botinfo\`\n\n[Support Server](https://discord.gg/ErzJGBBm48) | [Copyright](https://github.com/im-parsa/hafez-bot)`,
            footer: {
              text: " : درخواست شده توسط " + interaction.user.tag,
              icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
            },
          },
        ],
      });
    }

    let current = interaction.db.usage?.help || 0;
  //  db.set(interaction.guild.id, "usage.help", current + 1);
  },
};
