
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'sleep',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Переводит пользователя в спящий режим..',
  examples: [ 'hug @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Filter out args so that args are only user-mention formats.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.sleep();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Fran`);

    if ((message.guild && !message.mentions.members.size) || !args[0]){

      return message.channel.send(embed.setDescription(`${message.author} засыпает!`));

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send(embed.setDescription(`${message.author}, Я не настолько сонная....`));

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(embed.setDescription(`${message.author} засыпает!`));

    } else {

      return message.channel.send(
        embed.setDescription(`${message.author} засыпает с ${args[0]}!`)
      );

    };
  }
};
