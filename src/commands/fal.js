const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { db, config } = require("../../index.js");
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder().setName("fal").setDescription("Hafez Fal"),
  run: async (interaction) => {
    await interaction.deferReply();

    let getInfo = async () => {
      let response = await axios.post(`https://ludho.xyz/api?fal`, {}, { headers: {'api-key':"c816aefcece3f82a1204"}});
      let info = response.data;
      
      return info;
    };
    let data = await getInfo();
    let poem = `${data.poem[0]} — ${data.poem[1]}\n${data.poem[2]} — ${data.poem[3]}\n${data.poem[4]} — ${data.poem[5]}`;
    let explanation = `${data.explanation}`;

    // * STARTS HERE
    let number = data.number;
    let address = data.address;


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
      const translateExp = await axios.post(
        config.bot.api,
        {
          source: { dialect: "fa", text: explanation },
          target: { dialect: "en" },
        },
        {
          headers: {
            Authorization: config.bot.key,
            "Content-Type": "application/json",
          },
        }
      );

      interaction.editReply({
        embeds: [
          {
            color: "#fffff0",
            description: ` **Hafez Omen (${number})** <:Book_orange:950368110756642828>`,
            fields: [
              {
                name: "**<:Book_red:950368086467436594> Poem :**",
                value: `> ${translatePoem.data.target.text}`,
              },
              {
                name: "**<:Book_green:950368181527134259> Explanation :**",
                value: `> ${translateExp.data.target.text}`,
              },
            ],
            image: {
              url: "https://media.discordapp.net/attachments/954072013935374416/954447249339981854/20210114-074634-2046-2.jpg",
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
            description: `**(${number}) فال حافظ** <:Book_orange:950368110756642828>`,
            fields: [
              {
                name: "**: شعر <:Book_red:950368086467436594>**",
                value: `> ${poem}`,
              },
              {
                name: "**: تعبیر <:Book_green:950368181527134259>**",
                value: `> ${explanation}`,
              },
              {
                name: `_ _`,
                value: `[خواندن ادامه](${address})`,
              },
            ],
            image: {
              url: "https://media.discordapp.net/attachments/954072013935374416/954447249339981854/20210114-074634-2046-2.jpg",
            },
            footer: {
              text: "Fal Hafez | " + config.bot.version,
            },
          },
        ],
      });
    }

    let current = interaction.db.usage?.fal || 0;
    db.set(interaction.guild.id, "usage.fal", current + 1);
  },
};
