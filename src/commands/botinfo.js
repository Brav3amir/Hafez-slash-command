const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const db = require("../Database/functions");
const { client } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Fal Hafez info"),
  run: async (interaction) => {
    const db = interaction.db;
    var number_random = Math.floor(Math.random() * 495);
    let getInfo = async () => {
      let response = await axios.get(`https://api.falehafez.org/`);
      let info = response.data;
      return info;
    };
    let data = await getInfo();
    let poem = `${data.poem[0]} — ${data.poem[1]}\n${data.poem[2]} — ${data.poem[3]}\n${data.poem[4]} — ${data.poem[5]}`;
    let explanation = `${data.explanation}`;

    interaction.reply({
      embeds: [
        {
          color: "#fffff0",
          title: "📔 **Hafez Botinfo** 📔",
          thumbnail: {
            url: client.user.displayAvatarURL(),
          },
          fields: [
            {
              name: "🌐 Servers",
              value: `Active in **.${client.guilds.cache.size}.** Guild`,
              inline: true,
            },
            {
              name: "📺 Channels",
              value: `Active in **.${client.channels.cache.size}.** Channel`,
              inline: true,
            },
            {
              name: "👥 Users",
              value: `Active for **.${client.users.cache.size}.** Member`,
              inline: true,
            },
            {
              name: "⏳ Ping",
              value: `**.${Math.round(client.ws.ping)}ms.**`,
              inline: true,
            },
          ],
          footer: {
            text: "Request by : " + interaction.user.tag,
            icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
          },
        },
      ],
    });

    let current = interaction.db.usage?.botinfo || 0;
   // db.set(interaction.guild.id, "usage.botinfo", current + 1);
  },
};
