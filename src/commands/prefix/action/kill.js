const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kill',
  aliases: [],
  nsfw: true,
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую игру gif `kill`, направленную на упомянутого пользователя, если таковой имеется. Обычно интерпретируется как 「 Пользователь, который использовал эту команду, хочет убить упомянутого пользователя 」. Используйте, чтобы указать, что вы хотите убить упомянутого пользователя (контекст может варьироваться). Это команда ролевой игры и предназначена для использования в качестве шутки, однако она будет ограничена каналом nsfw из-за чувствительного характера этой команды. Контекст не должен включать реальные преступления.',
  examples: [ 'kill @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Filter out args so that args are only user-mention formats.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x));

    const url = client.images.kill();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Hu Tao`);

    if (!message.mentions.members.size){

      return message.channel.send(embed);

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send(
        embed.setDescription(`Остановись ${message.member}! Ты не можешь убить меня!`)
      );

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(embed);

    } else {

      return message.channel.send(
        embed.setDescription(`${message.member} просто убили ${args[0]}! Оживление через t-минус n секунд.`)
      );

    };
  }
};
