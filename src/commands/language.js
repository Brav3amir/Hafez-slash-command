const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, GuildMember, Permissions } = require("discord.js");
const db = require("../Database/functions.js");
const { client } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("language")
    .setDescription("You can Select your language")
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("Select your language")
        .addChoice("English", "en")
        .addChoice("Persian", "fa")
        .setRequired(true)
    ),
  run: async (interaction) => {
    const option = interaction.options._hoistedOptions[0];
    const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

    let msg;
    let errMsg;
    let fpMsg;
    if (option.value === "en") {
      msg = ":flag_us: **English language is set** by: ";
      errMsg = "You must have `Manage Guild` permission to use this command.";
      fpMsg = "You can use `/language` to change the language again.";
    } else if (option.value === "fa") {
      msg = "**زبان فارسی انتخاب شد** :flag_ir: توسط: ";
      errMsg = `برای تغییر زبان بات شما نیاز به دسترسی "Manage Server" دارید`;
      fpMsg =
        "شما میتوانید برای تغییر دوباره زبان از دستور `/language` استفاده کنید.";
    }
    await interaction.deferReply({ ephemeral: true });

    await sleep();

    if (!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_GUILD])) {
      // interaction.deleteReply();

      return await interaction
        .editReply({ content: errMsg, ephemeral: true })
        .catch((err) => {
          console.log(err);
        });
    }

    db.set(interaction.guild.id, "language", option.value);

    delete require.cache[
      require.resolve(`../../db/server/${interaction.guild.id}.json`)
    ];
    interaction.db =
      await require(`../../db/server/${interaction.guild.id}.json`);

    await interaction.editReply({ content: fpMsg, ephemeral: true });
    await interaction.followUp(msg + interaction.member.displayName);
  },
};
