const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const db = require("../Database/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pic")
    .setDescription("hafez picture"),
  run: async (interaction) => {
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
    let image = replies_[num_];
    let poem_en = replies[num_];

    if (interaction.db.language === "en") {
      interaction.reply({
        embeds: [
          {
            color: "#fffff0",
            description: ` **Hafez Picture (${number_random})** 📜`,
            fields: [
              {
                name: "**🔖 Poem :**",
                value: `> ${poem_en}`,
              },
            ],
            image: {
              url: image,
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
            description: `📔 **(${number_random}) عکس حافظ** 📔`,
            fields: [
              {
                name: "**: شعر 📔**",
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
              text: " : درخواست شده توسط " + interaction.user.tag,
              icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
            },
          },
        ],
      });
    }

    let current = interaction.db.usage?.pic || 0;
 //   db.set(interaction.guild.id, "usage.pic", current + 1);
  },
};
