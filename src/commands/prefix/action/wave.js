const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'wave',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Помаши кому-нибудь.',
  examples: [ 'wave @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Filter out args so that args are only user-mention formats.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.wave();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Fran`);

    if ((message.guild && !message.mentions.members.size) || !args[0]){

      return message.channel.send(embed.setDescription(`${message.author} машет!`));

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send(embed.setDescription(`${message.author} машет в ответ`));

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(embed.setDescription(`${message.author} машет!`));

    } else {

      return message.channel.send(
        embed.setDescription(`${message.author} waves at ${args[0]}!`)
      );

    };
  }
};
