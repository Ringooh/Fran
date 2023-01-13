const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'smug',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую игру gif `smug`. Обычно интерпретируется как 「 Пользователь, который использовал эту команду smugs в предыдущем чате 」. Используйте его, чтобы показать, что вы чувствуете скрытый мотив предыдущего пользователя, отправленного в чат.',
  examples: [ 'smug' ],
  parameters: [],
  run: async ( client, message, args ) => {

    return message.channel.send(
      new MessageEmbed()
      .setDescription(`${message.author} smugs.`)
      .setColor('BLACK')
      .setImage(client.images.smug())
      .setFooter(`Action Commands | \©️${new Date().getFullYear()} Hu Tao`)
    );
  }
};
