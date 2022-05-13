const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const config = require("../../config.js");
const { client, db } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ghazal")
    .setDescription("ghazal hafez"),
  run: async (interaction) => {
    await interaction.deferReply();

    var number_random = Math.floor(Math.random() * 495);

    let getInfo = async () => {
      let response = await axios.get(`https://api.falehafez.org/`);
      let info = response.data;
      return info;
    };
    let data = await getInfo();
    let poem = `${data.poem[0]} — ${data.poem[1]}\n${data.poem[2]} — ${data.poem[3]}\n${data.poem[4]} — ${data.poem[5]}\n${data.poem[6]} — ${data.poem[7]}\n${data.poem[8]} — ${data.poem[9]}\n${data.poem[10]} — ${data.poem[11]}`;

    let replies_i = [
      //"https://i.pinimg.com/736x/e6/31/a3/e631a3f05b3178b86655cedc03215163.jpg",
      // "https://cdn.dribbble.com/users/2152869/screenshots/5455756/media/d3822d5f161c8b3eb13eca5cfef00ff7.jpg?compress=1&resize=400x300",
      // "https://cdn.dribbble.com/users/823943/screenshots/6599844/adabiyat.png?compress=1&resize=400x300",
      "https://images-ext-2.discordapp.net/external/Xtu9z-owOZIMKOXoNYjxj2moNPKWjwx6G95de1UGXlg/https/www.falehafez.org/assets/img/pic5.jpg",
    ];

    var num_ = Math.floor(Math.random() * replies_i.length);
    let image = replies_i[num_];

    if (interaction.db.language === "en") {
      const translatePoem = await axios.post(
        config.bot.api,
        {
          source: { dialect: "fa", text: poem },
          target: { dialect: "en" },
        },
        {
          headers: {
            Authorization: config.bot.key,
            "Content-Type": "application/json",
          },
        }
      );

      await interaction.editReply({
        embeds: [
          {
            color: "#fffff0",
            description: ` **Hafez Peoms (${number_random})** <:Book_orange:950368110756642828>`,
            fields: [
              {
                name: "**<:Book_red:950368086467436594> Poem :**",
                value: `> ${translatePoem.data.target.text}`,
              },
            ],
            image: {
              url: image,
            },
            footer: {
              text: "Fal Hafez | " + config.bot.version,
            },
          },
        ],
      });
    } else if (interaction.db.language === "fa") {
      await interaction.editReply({
        embeds: [
          {
            color: "#fffff0",
            description: `**(${number_random}) غزلیات حافظ** <:Book_orange:950368110756642828>`,
            fields: [
              {
                name: "**: شعر <:Book_red:950368086467436594>**",
                value: `> ${poem}`,
              },
            ],
            image: {
              url: image,
            },
            footer: {
              text: "Fal Hafez | " + config.bot.version,
            },
          },
        ],
      });
    }

    let current = interaction.db.usage?.ghazal || 0;
    db.set(interaction.guild.id, "usage.ghazal", current + 1);
  },
};
