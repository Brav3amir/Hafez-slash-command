const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { client, db, config } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pic")
    .setDescription("hafez picture"),
  run: async (interaction) => {
    await interaction.deferReply();

    let getInfo = async () => {
      let response = await axios.post(
        `https://ludho.xyz/api?fal`,
        {},
        { headers: { "api-key": "c816aefcece3f82a1204" } }
      );
      let info = response.data;

      return info;
    };
    let data = await getInfo();

    let poem = `> ${data.poem[0]} \n> ${data.poem[1]}`;
    let number = data.number;

    let replies_ = data.images;

    let num_ = Math.floor(Math.random() * data.images.length);
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
            description: ` **Hafez Picture (${number})** <:Book_orange:950368110756642828>`,
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
            description: `**(${number}) عکس حافظ** <:Book_orange:950368110756642828>`,
            fields: [
              {
                name: "**: شعر <:Book_red:950368086467436594>**",
                value: `${poem}`,
              },
              {
                name: `حافظ شیرازی`,
                value: `[خواندن ادامه](${data.address})`,
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
