const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'happy',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую игру gif "happy". Обычно интерпретируется как 「 Пользователь, который использовал эту команду, счастлив (shiawase da!!) 」. Используйте для обозначения того, что вы в данный момент счастливы (контекст может варьироваться). Может использоваться в том же контексте, что и эмодзи 😃.',
  examples: [ 'happy' ],
  parameters: [],
  run: async ( client, message ) => {

    return message.channel.send(
      new MessageEmbed()
      .setDescription(`${message.author} is happy.`)
      .setColor('BLACK')
      .setImage(client.images.happy())
      .setFooter(`Action Commands | \©️${new Date().getFullYear()} Hu Tao`)
    );
  }
};
