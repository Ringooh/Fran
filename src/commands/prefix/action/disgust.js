const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'disgust',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую игру gif "отвращение", направленную на упомянутого пользователя, если таковой имеется. Обычно интерпретируется как 「Пользователь, которому адресована эта команда, является digusting (Mazui!!, Kimoi!!) 」. Используйте для обозначения того, что вам противны их (идеи по их) предыдущим чатам. Может использоваться в том же контексте, что и эмодзи 🤮.',
  examples: [ 'disgust @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Filter out args so that args are only user-mention formats.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.disgust();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Fran`);

    if (message.guild && !message.mentions.members.size){

      return message.channel.send(embed.setDescription(`${message.member} испытывает отвращение..`));

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.react('💢');

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(embed.setDescription(`${message.author} испытывает отвращение..`));

    } else {

      return message.channel.send(
        embed.setDescription(`${args[0]} eww!`)
      );

    };
  }
};
