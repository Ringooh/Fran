const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'hug',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую игру gif `hug`, направленную на упомянутого пользователя, если таковой имеется. Обычно интерпретируется как 「Пользователь, которому адресована эта команда, был обнят 」. Используйте для обозначения того, что вы хотите обнять упомянутого пользователя (контекст может варьироваться). Может использоваться в том же контексте, что и эмодзи 🤗.',
  examples: [ 'hug @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Filter out args so that args are only user-mention formats.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.hug();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Hu Tao`);

    if ((message.guild && !message.mentions.members.size) || !args[0]){

      return message.channel.send(embed.setDescription(`${message.author} Х~здесь! Я думала, тебе нужно обняться!`));

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send(embed.setDescription(`${message.author} Х~как заботливо! Спасибо!`));

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(embed.setDescription(`${message.author} Х~здесь! Я думала, тебе нужно обняться!`));

    } else {

      return message.channel.send(
        embed.setDescription(`${args[0]} был(а) обнят(а) ${message.author}!`)
      );

    };
  }
};