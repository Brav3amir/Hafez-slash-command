const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const db = require("../Database/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ghazal")
    .setDescription("ghazal hafez"),
  run: async (interaction) => {
    var number_random = Math.floor(Math.random() * 495);

    let getInfo = async () => {
      let response = await axios.get(`https://api.falehafez.org/`);
      let info = response.data;
      return info;
    };
    let data = await getInfo();
    let poem = `${data.poem[0]} — ${data.poem[1]}\n${data.poem[2]} — ${data.poem[3]}\n${data.poem[4]} — ${data.poem[5]}\n${data.poem[6]} — ${data.poem[7]}\n${data.poem[8]} — ${data.poem[9]}\n${data.poem[10]} — ${data.poem[11]}`;

    let replies = [
      "Before, you thought more of lovers — Your kindness to us was Shohreh Afagh",
      "Remember that night talk with Noushin Laban — The discussion was about love and mentioning the circle of lovers",
      "Before this, Cain should break the green roof and the enamel arch — The sight of my eyes was the eyebrows of Janan Tagh",
      "From the beginning of the morning until the end of the evening — Friendship and love were based on a covenant and a covenant",
      "What if the shadow of the beloved fell on the lover? — We needed him. He wanted us.",
      "Hassan Meh Royan Majles, although he takes heart and religion — Our discussion was thanks to nature and good morals",
      "He made a point at the begging king — God said, 'Every time I sat down, God was pleased",
    ];
    var num_ = Math.floor(Math.random() * 7);
    let poem_en = replies[num_];

    if (interaction.db.language === "en") {
      interaction.reply({
        embeds: [
          {
            color: "#fffff0",
            description: ` **Hafez Peoms (${number_random})** 📜`,
            fields: [
              {
                name: "**🔖 Poem :**",
                value: `> ${poem_en}`,
              },
            ],
            image: {
              url: "https://cdn.discordapp.com/attachments/901428292693921817/901713445857157150/116-hafez.jpg",
            },
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
            description: `📔 **(${number_random}) فال حافظ** 📔`,
            fields: [
              {
                name: "**: شعر 📔**",
                value: `> ${poem}`,
              },
            ],
            image: {
              url: "https://media.discordapp.net/attachments/901428292693921817/901713445857157150/116-hafez.jpg?width=1122&height=701",
            },
            footer: {
              text: " : درخواست شده توسط " + interaction.user.tag,
              icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
            },
          },
        ],
      });
    }

    let current = interaction.db.usage?.ghazal || 0;
  //  db.set(interaction.guild.id, "usage.ghazal", current + 1);
  },
};
