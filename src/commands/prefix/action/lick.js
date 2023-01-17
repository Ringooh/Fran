const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'lick',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую игру gif `lick`, направленную на упомянутого пользователя, если таковой имеется. Обычно интерпретируется как 「 Пользователь, которому адресована эта команда, был облизан (lero lero lero lero lero) 」. Используйте для обозначения того, что вы хотите / хотите лизнуть упомянутого пользователя (контекст может варьироваться).',
  examples: [ 'lick @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Filter out args so that args are only user-mention formats.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.lick();
    const disgust = client.images.disgust();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Fran`);

    if ((message.guild && !message.mentions.members.size) || !args[0]){

      return message.channel.send(embed);

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send(embed.setImage(disgust).setDescription(`${message.author}`));

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(`\\❌ **${message.author.tag}**, вы когда - нибудь слышали о зеркале?`);

    } else {

      return message.channel.send(
        embed.setDescription(`${message.member} просто лизнул ${args[0]}!`)
      );

    };
  }
};
