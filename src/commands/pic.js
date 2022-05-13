const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { client, db, config } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pic")
    .setDescription("hafez picture"),
  run: async (interaction) => {
    await interaction.deferReply();
    var number_random = Math.floor(Math.random() * 495);

    let getInfo = async () => {
      let response = await axios.get(`https://c.ganjoor.net/beyt-json.php?p=2`);
      let info = response.data;
      return info;
    };
    let data = await getInfo();

    let poem = `${data.m1} \n ${data.m2}`;

    let replies_ = [
      "https://cdn.discordapp.com/attachments/760896469023850588/832576634489929728/782482961-talab-org.jpg",
      "https://cdn.discordapp.com/attachments/760896469023850588/832576633667715112/1.jpg",
      "https://cdn.discordapp.com/attachments/760896469023850588/832576633901678602/b5759593fdad5a8d.jpg",
      "https://cdn.discordapp.com/attachments/760896469023850588/832576634078625832/ef6cdaaf78ea9696.jpg",
      "https://cdn.discordapp.com/attachments/760896469023850588/832576634279428136/Hamgardi_0349zvzbc89_resize.jpg",
      "https://cdn.discordapp.com/attachments/760896469023850588/832577287551451177/1660401.jpg",
      "https://cdn.discordapp.com/attachments/760896469023850588/832577287693533194/e67ebce5d3751d45.png",
    ];

    var num_ = Math.floor(Math.random() * 7);
    let image = replies_[num_];

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
            description: ` **Hafez Picture (${number_random})** <:Book_orange:950368110756642828>`,
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
            description: `**(${number_random}) عکس حافظ** <:Book_orange:950368110756642828>`,
            fields: [
              {
                name: "**: شعر <:Book_red:950368086467436594>**",
                value: `> ${poem}`,
              },
              {
                name: `${data.poet}`,
                value: `[خواندن ادامه](${data.url})`,
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

    let current = interaction.db.usage?.pic || 0;
    db.set(interaction.guild.id, "usage.pic", current + 1);
  },
};
