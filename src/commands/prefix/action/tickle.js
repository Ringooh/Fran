const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'tickle',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую гифку `tickle`, направленную на упомянутого пользователя, если таковой имеется. Обычно интерпретируется как 「 Пользователь, которому адресована эта команда, был щекочен 」. Используйте для обозначения того, что вы пощекотали упомянутого пользователя (контекст может варьироваться).',
  examples: [ 'tickle @user' ],
  parameters: ['User Mention'],
  run: async ( client, message, args ) => {

    // Filter out args so that args are only user-mention formats.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.tickle();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Fran`);

    if ((message.guild && !message.mentions.members.size) || !args[0]){

      return message.channel.send(embed);

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send(
        embed.setDescription(`Перестань ${message.author}! щекотно~`)
      );

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(`\\❌ Получайте удовольствие щекоча себя **${message.author.tag}**!`);

    } else {

      return message.channel.send(
        embed.setDescription(`${message.author} tickled ${args[0]}`)
      );

    };
  }
};
