const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const db = require("../Database/functions.js");

module.exports = {
  data: new SlashCommandBuilder().setName("fal").setDescription("Hafez Fal"),
  run: async (interaction) => {
    var number_random = Math.floor(Math.random() * 495);
    let getInfo = async () => {
      let response = await axios.get(`https://api.falehafez.org/`);
      let info = response.data;
      return info;
    };
    let data = await getInfo();
    let poem = `${data.poem[0]} — ${data.poem[1]}\n${data.poem[2]} — ${data.poem[3]}\n${data.poem[4]} — ${data.poem[5]}`;
    let explanation = `${data.explanation}`;

    let replies = [
      "Before, you thought more of lovers — Your kindness to us was Shohreh Afagh",
      "Remember that night talk with Noushin Laban — The discussion was about love and mentioning the circle of lovers",
      "Before this, Cain should break the green roof and the enamel arch — The sight of my eyes was the eyebrows of Janan Tagh",
      "From the beginning of the morning until the end of the evening — Friendship and love were based on a covenant and a covenant",
      "What if the shadow of the beloved fell on the lover? — We needed him. He wanted us.",
      "Hassan Meh Royan Majles, although he takes heart and religion — Our discussion was thanks to nature and good morals",
      "He made a point at the begging king — God said, 'Every time I sat down, God was pleased",
    ];

    let replies_ = [
      "Let go of selfishness and arrogance so that you can think better about your work. Continue your work and effort with wisdom and wisdom. Be patient and rely on your faith to achieve your goal and purpose.",
      "You expect help from someone, but to achieve the goal you must rely on yourself and do not trample on your personality and self-esteem in order to achieve the goal. Do not be indifferent to others and try to solve their problems.",
      "Luck is with you today. The world is showing you its good side. Take it as a boot. Your patience and endurance will bring good results. Thank God.",
      "Avoid pride and arrogance in life and be kind to friends and acquaintances, and when you are needless and comfortable, think of the hardships and hardships of others' lives. With kindness and friendship and with the help of others, you can have a comfortable life.",
      "Life revolves around you and you achieve your dreams. You will be completely successful in life. Avoid jealousy and hypocrisy. Do not be arrogant towards others so that your blessings and happiness will be lasting and continuous.",
      "Happiness and bliss have come to you. Let go of the sorrow of the world and do not take it hard. What happens is in your goodness. Try different ways so that your happiness and joy will be lasting.",
      "he person you love will walk away from you and you will be depressed and sad. Love will untie the knot of your problem. With a little effort and determination, you can reach your goal.",
    ];

    var num_ = Math.floor(Math.random() * 7);

    let poem_en = replies[num_];
    let explanation_en = replies_[num_];
    if (interaction.db.language === "en") {
      interaction.reply({
        embeds: [
          {
            color: "#fffff0",
            description: ` **Hafez Omen (${number_random})** 📜`,
            fields: [
              {
                name: "**🔖 Poem :**",
                value: `> ${poem_en}`,
              },
              {
                name: "**📝 Explanation :**",
                value: `> ${explanation_en}`,
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
              {
                name: "**: تعبیر 📔**",
                value: `> ${explanation}`,
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

    let current = interaction.db.usage?.fal || 0;
   // db.set(interaction.guild.id, "usage.fal", current + 1);
  },
};
