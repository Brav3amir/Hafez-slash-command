const fs = require("fs");
const { Discord, MessageEmbed} = require("discord.js")
const data = require("../Database/functions.js");
const messageCreate = require("./messageCreate.js");
const sleep = (ms = 1000) => new Promise((r) => setTimeout(() => r, ms));
const { client } = require("../../index.js");

module.exports = {
  event: "guildDelete",
  oneTime: false,
  run: async (guild) => {
    data.delete(guild.id);

    const guildICON = guild.iconURL({ dynamic: true }) || 'https://cdn.discordapp.com/attachments/916778395558371338/916792163206037504/unnamed.png'


    //const owner = await guild.fetchOwner();

    const joinguildpv = client.channels.cache.get('940711428002816002');
    const joinguild = client.channels.cache.get('940711428002816002');

    joinguildpv.send({
      embeds: [{
      description: "**بات از یک سرور حدف شد شد 🌐**",
      fields: [
        {
          name: `:octagonal_sign: Server Name : ${guild.name}`,
          value: `:octagonal_sign: Server Owner : **BUG**`,
        },
        {
          name: `:octagonal_sign: Server ID : ${guild.id}`,
          value: `:octagonal_sign: Member Count : ${guild.memberCount}`,
        },
      ],
      color: "#ff0000"
      }]});
  
    joinguild.send({
      embeds: [{
        description: "**The bot was removed from a server**",
        author: {
          name: `${guild.name}`,
          icon_url: guildICON,
        },
        color: "#ff0000"
      }]
  
  });
      let myGuild = client.guilds.cache.get('940711427554041947'); // your server token goes here.
     let memberCount = client.guilds.cache.size
      let memberCountChannel = myGuild.channels.cache.get('940711428002816003'); // your channel id goes here.
     memberCountChannel.setName('Servers : ' + memberCount)
      .catch(error => console.log(error));

  },
};
