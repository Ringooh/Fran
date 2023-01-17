const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'suicide',
  aliases: ['kms'],
  nsfw: true,
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую гифку "самоубийство". Обычно интерпретируется как 「 Пользователь, который использовал эту команду, хочет совершить самоубийство (в шутливой манере) 」. Используйте для обозначения того, что вы ошеломлены диаграммами предыдущего пользователя, которые заставляют вас хотеть поцеловаться. Это команда ролевой игры и предназначена для использования в качестве шутки, однако она будет ограничена каналом nsfw из-за чувствительного характера этой команды. Контекст не должен включать реальные преступления.',
  examples: [ 'suicide', 'kms' ],
  parameters: [],
  run: async ( client, message) => {

    return message.channel.send(
      new MessageEmbed()
      .setDescription(`${message.author} только что покончил жизнь самоубийством. Ужасный.`)
      .setColor('BLACK')
      .setImage(client.images.suicide())
      .setFooter(`Action Commands | \©️${new Date().getFullYear()} Fran`)
    );
  }
};
