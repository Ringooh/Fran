const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kiss',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую игру gif `kiss`, направленную на упомянутого пользователя, если таковой имеется. Обычно интерпретируется как " Пользователь, которому адресована эта команда, был поцелован ". Используйте для обозначения того, что вы хотите поцеловать упомянутого пользователя (контекст может варьироваться). Может использоваться в том же контексте, что и эмодзи 😘.',
  examples: [ 'kiss @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Filter out args so that args are only user-mention formats.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.kiss();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Hu Tao`);

    if ((message.guild && !message.mentions.members.size) || !args[0]){

      return message.channel.send(`\\❌ **${message.author.tag}**, вы достаточно отчаялись, чтобы поцеловать невидимого пользователя ?!`);

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send(embed.setDescription(`${message.author} E~ecchi!`));

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(`\\❌ **${message.author.tag}**, вы когда - нибудь слышали о зеркале?`);

    } else {

      return message.channel.send(
        embed.setDescription(`${message.member} просто поцеловал ${args[0]}!`)
      );

    };
  }
};
