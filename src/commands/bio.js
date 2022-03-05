const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const axios = require("axios");
const db = require("../Database/functions.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bio")
    .setDescription("Hafez Biography"),
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

    if (interaction.db.language === "en") {
      interaction.reply({
        embeds: [
          {
            color: "#fffff0",
            description: " **Hafez Biography** 📜",
            fields: [
              {
                name: "**📝 Biography :**",
                value: `> Khwaja Shams al-Din Muhammad ibn Baha'u'llah Muhammad Hafiz Shirazi (born 727 AH - died 792 AH in Shiraz), nicknamed the language of the unseen, translator of the secrets of Iran `,
              },
              {
                name: "🎂 Born :",
                value: "1315",
              },
              {
                name: "💀 Died :",
                value: "1390",
              },
              {
                name: "📚 Peom :",
                value: "Divan Hafez",
              },
              {
                name: "🏛️ Place of burial :",
                value: "Shiraz",
              },
            ],
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
            description: `📜 **زِنـدِگـی نـامـه حـافِـظْ** `,
            fields: [
              {
                name: "**: زندگی نامه 📝**",
                value: `> خواجه شمس‌ُالدّینْ محمّدِ بن بهاءُالدّینْ محمّدْ حافظ شیرازی (زادهٔ ۷۲۷ هجری قمری – درگذشتهٔ ۷۹۲ هجری قمری در شیراز)، ملقب به لِسان‌ُالْغِیْب، تَرجُمانُ الْاَسرار، لِسان‌ُالْعُرَفا و ناظِم‌ُالاُولیاء، شاعر سدهٔ هشتم هجری ایران است. بیش‌تر شعرهای او غزل هستند که به غزلیات شهرت دارند.`,
              },
              {
                name: "**🎂 تولد :**",
                value: "۷۰۶",
              },
              {
                name: "**💀 فوت :**",
                value: "۷۶۹",
              },
              {
                name: "**📚 دیوان اشعار :**",
                value: "دیوان حافظ",
              },
              {
                name: "**🏛️ محل خاکسپاری :**",
                value: "شیراز",
              },
            ],
            footer: {
              text: " : درخواست شده توسط " + interaction.user.tag,
              icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
            },
          },
        ],
      });
    }

    let current = interaction.db.usage?.bio || 0;
  //  db.set(interaction.guild.id, "usage.bio", current + 1);
  },
};
