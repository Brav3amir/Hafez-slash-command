const { SlashCommandBuilder } = require("@discordjs/builders");
const { client, db, config } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bio")
    .setDescription("Hafez Biography"),
  run: async (interaction) => {
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
              text: "Fal Hafez | " + config.bot.version,
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
              text: "Fal Hafez | " + config.bot.version,
            },
          },
        ],
      });
    }

    let current = interaction.db?.usage?.bio || 0;
    db.set(interaction.guild.id, "usage.bio", current + 1);
  },
};
