const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'holdhands',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Держитесь за руки кого-то особенного.',
  examples: [ 'holdhands @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Отфильтруйте args так, чтобы args были только форматами упоминания пользователя.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.holdhands();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Hu Tao`);

    if ((message.guild && !message.mentions.members.size) || !args[0]){

      return message.channel.send(`\\❌ **${message.author.tag}**, чьи руки ты держишь?!`);

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

     return message.channel.send(embed.setImage(client.images.slap()).setDescription(`${message.author} baka!`));

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(`\\❌ **${message.author.tag}**, srsly, чьи руки ты вообще держишь?`);

    } else {

      return message.channel.send(
        embed.setDescription(`${message.author} держит за руки ${args[0]}!`)
      );

    };
  }
};
