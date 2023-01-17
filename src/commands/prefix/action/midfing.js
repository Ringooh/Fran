const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'midfing',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  nsfw: true,
  description: 'Отправляет в чат ролевую игру gif `midfing`, направленную на упомянутого пользователя, если таковой имеется. Обычно интерпретируется как 「 Пользователь, который использовал эту команду, хочет, чтобы упомянутый пользователь **** выключился 」. Используйте для обозначения того, что вы раздражены пользователем (контекст может варьироваться). Это команда ролевой игры и предназначена для использования в качестве шутки, однако она будет ограничена каналом nsfw из-за чувствительного характера этой команды.',
  examples: [ 'midfing @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const midfing = client.images.midfing();
    const baka = client.images.baka();

    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Fran`);

    if (!message.mentions.members.size){

      message.channel.send(embed.setImage(midfing));

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send(embed.setImage(baka).setDescription(message.author.toString()));

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(embed.setImage(midfing));

    } else {

      return message.channel.send(
        embed.setDescription(`${message.member.displayName}: "Эй ${args[0]}!"`)
      );

    };
  }
};
