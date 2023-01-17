const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'poke',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую гифку `poke`, адресованную указанному пользователю, если таковой имеется. Обычно интерпретируется как 「 Упомянутый пользователь игнорирует вас, поэтому вы их тыкаете 」. Используйте, чтобы указать, что вы нуждаетесь в внимании со стороны упомянутого пользователя (контекст может отличаться).',
  examples: [ 'poke @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Filter out args so that args are only user-mention formats.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.poke();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Fran`);

    if ((message.guild && !message.mentions.members.size) || !args[0]){

      return message.channel.send(`\\❌ **${message.author.tag}**, кого я должна тыкать?`);

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send(
        embed.setDescription('Я уже здесь! Что-то нужно?')
      );

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(`\\❌ No **${message.author.tag}**!`);

    } else {

      return message.channel.send(
        embed.setDescription(`${message.member} poked ${args[0]}`)
      );

    };
  }
};
