const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
  } = require('discord.js');

const { MessageEmbed } = require("discord.js");


module.exports = {
  name: 'say',
  aliases: ["s", "say"],
  guildOnly: true,
  permissionsRequired: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ManageChannels],
  botPermissions: [PermissionFlagsBits.Administrator],
  // permissions: [ 'MANAGE_MESSAGES', 'MANAGE_CHANNELS' ],
  clientPermissions: [ PermissionFlagsBits.ManageChannels ],
  callback: (client, interaction) => {
    interaction.reply(args.join(" "));
  },
  group: 'moderation',
  description: "Говорить сообщением через бота",
  examples: [
    'say 123',
    's 123'
  ],
    
    run: (client, message, args) => {
        message.delete();

        if (args.length < 0)
            return message.reply("Нечего сказать?").then(m => m.delete(5000));

        const roleColor = message.guild.me.roles.highest.hexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(roleColor === "#000000" ? "#ffffff" : roleColor);

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}
