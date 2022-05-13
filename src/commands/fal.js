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
      let response = await axios.get(`https://api.falehafez.org/`);
      let info = response.data;
      return info;
    };
    let data = await getInfo();
    let poem = `${data.poem[0]} — ${data.poem[1]}\n${data.poem[2]} — ${data.poem[3]}\n${data.poem[4]} — ${data.poem[5]}`;
    let explanation = `${data.explanation}`;

    // * STARTS HERE
    let poemEx = await data.poem[0];

    const response = await fetch(
      `https://ganjoor.net/search?s=${encodeURI(poemEx)}&author=2`
    );
    const body = await response.text();

    const dom = new JSDOM(body);
    const doc = dom.window.document;
    let para = doc
      .getElementsByClassName("sit")
      [doc.getElementsByClassName("sit").length - 1].getElementsByTagName("p");
    let address =
      "https://ganjoor.net/" +
      encodeURI(para[para.length - 1].getElementsByTagName("a")[0].href);

    // !                        Fal Number!
    const number = address
      .split("/")
      [address.split("/").length - 1].split("sh")[1];

    const response2 = await fetch(address);
    const body2 = await response2.text();
    const dom2 = new JSDOM(body2);
    const doc2 = dom2.window.document;

    let images = doc2.getElementsByClassName("related-image-container");
    const randomImage = Math.floor(Math.random() * images.length + 1);

    let audios = doc2.getElementsByClassName("audio-player");
    const randomAudio = Math.floor(Math.random() * audios.length + 1);

    // !                        Fal Image!
    let imageLink = images[0]
      .getElementsByTagName("a")[0]
      .getElementsByTagName("img")[0].src;
    let image =
      "https://media.discordapp.net/attachments/954072013935374416/954447249339981854/20210114-074634-2046-2.jpg";
    image = await fetch(imageLink).then((res) => {
      res.body.pipe(fs.createWriteStream("./db/images.png"));
    });
    console.log(imageLink);

    // !                        Fal Audio!
    let audio = audios[randomAudio]
      .getElementsByTagName("audio")[0]
      .getElementsByTagName("source")[0].src;
    console.log(audio);
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
              // TODO not displaying!
              url: "./db/image.png",
            },
            footer: {
              text: "Fal Hafez | " + config.bot.version,
            },
          },
        ],
      });
      interaction.followUp({ content: imageLink });
    }

    let current = interaction.db.usage?.fal || 0;
    db.set(interaction.guild.id, "usage.fal", current + 1);
  },
};
