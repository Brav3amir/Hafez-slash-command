const { prefix } = require("../../config.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const { client } = require("../../index.js");
const owner = "803203173581455411";
const fs = require("fs");

module.exports = {
  event: "messageCreate",
  oneTime: false,
  run: async (message) => {
    let args = message.content.split(" ");

    delete require.cache[
      require.resolve(`../../db/server/${message.guild.id}.json`)
    ];
    message.db = require(`../../db/server/${message.guild.id}.json`);
    let txt;

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setURL(
            `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=137439861953&scope=bot%20applications.commands`
          )
          .setLabel("Invite Link")
          .setStyle("LINK")
      )
      .addComponents(
        new MessageButton()
          .setURL(`https://discord.gg/yHfjnCsJ38`)
          .setLabel("Support Server")
          .setStyle("LINK")
      );

    if (message.db.language === "en") {
      txt =
        "Fal Hafez now uses slash commands `/help`, if you can't access it, click on the invite button below and authorize it to your server.";
    } else if (message.db.language === "fa") {
      txt =
        " بات فال حافظ اکنون از دستورات اسلش پشتیبانی می کند. برای استفاده از دستورات اسلش از `help/` استفاده کنید.\n\n در صورتی که به دستورات اسلش دسترسی ندارید به اونر سرور خود بگویید بات را از طریق لینک زیر به سرور اضافه کند.";
    }
    img =
      "https://cdn.discordapp.com/attachments/953714967335542874/953928643443314738/Slash.gif";

    // const events = fs
    //   .readdirSync("../commands")
    //   .filter((file) => file.endsWith(".js"));

    // if (message.content.startsWith("?fal"))
    //   message.reply({
    //     embeds: [{ description: txt, color: "#fffff0", image: { url: img } }],
    //     components: [row],
    //     ephemeral: true,
    //   });

    // if (message.content.startsWith("?ghazal"))
    //   message.reply({
    //     embeds: [{ description: txt, color: "#fffff0" }],
    //     components: [row],
    //     ephemeral: true,
    //   });

    // if (message.content.startsWith("?bio"))
    //   message.reply({
    //     embeds: [{ description: txt, color: "#fffff0", image: { url: img } }],
    //     components: [row],
    //     ephemeral: true,
    //   });

    // if (message.content.startsWith("?botinfo"))
    //   message.reply({
    //     embeds: [{ description: txt, color: "#fffff0", image: { url: img } }],
    //     components: [row],
    //     ephemeral: true,
    //   });

    // if (message.content.startsWith("?help"))
    //   message.reply({
    //     embeds: [{ description: txt, color: "#fffff0", image: { url: img } }],
    //     components: [row],
    //     ephemeral: true,
    //   });

    // if (message.content.startsWith("?invite"))
    //   message.reply({
    //     embeds: [{ description: txt, color: "#fffff0", image: { url: img } }],
    //     components: [row],
    //     ephemeral: true,
    //   });

    // if (message.content.startsWith("?language"))
    //   message.reply({
    //     embeds: [{ description: txt, color: "#fffff0", image: { url: img } }],
    //     components: [row],
    //     ephemeral: true,
    //   });

    // if (message.content.startsWith("?pic"))
    //   message.reply({
    //     embeds: [{ description: txt, color: "#fffff0", image: { url: img } }],
    //     components: [row],
    //     ephemeral: true,
    //   });

    // if (message.content.startsWith("?invite"))
    //   message.reply({
    //     embeds: [{ description: txt, color: "#fffff0", image: { url: img } }],
    //     components: [row],
    //     ephemeral: true,
    //   });

    // if (message.content.startsWith("?leave")) {
    //   if(message.author.id !== owner) return message.channel.send("Only bot owner can use this command");
    //   const guild = client.guilds.cache.get("")
    //   guild.leave();
    //   }
  },
};
