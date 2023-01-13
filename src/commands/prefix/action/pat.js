const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pat',
  aliases: ['headpat'],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую игру gif `pat`, направленную на упомянутого пользователя, если таковой имеется. Обычно интерпретируется как 「 Пользователь дал головную повязку упомянутому пользователю 」. Используйте для обозначения того, что вы хотите / хотите возглавить упомянутого пользователя (контекст может варьироваться).',
  examples: [ 'pat @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Filter out args so that args are only user-mention formats.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.pat();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Hu Tao`);

    if ((message.guild && !message.mentions.members.size) || !args[0]){

      message.channel.send(embed.setDescription(`Вот так ${message.author}, \*pat* \*pat*`));

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send(embed.setDescription('UwU <3! Спасибо!'));

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(embed.setDescription(`Вот так ${message.author}, \*pat* \*pat*`));

    } else {

      return message.channel.send(
        embed.setDescription(`${message.member} pats ${args[0]}!`)
      );

    };
  }
};
