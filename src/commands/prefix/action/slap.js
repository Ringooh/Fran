const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'slap',
  aliases: [],
  clientPermissions: [
    'EMBED_LINKS',
    'ADD_REACTIONS'
  ],
  group: 'action',
  description: 'Отправляет в чат ролевую игру gif `slap`, направленную на упомянутого пользователя, если таковой имеется. Обычно интерпретируется как 「 Пользователь, которому адресована эта команда, получил пощечину 」. Используйте для обозначения того, что вы хотите / хотите ударить упомянутого пользователя (контекст может варьироваться).',
  examples: [ 'slap @user' ],
  parameters: [ 'User Mention' ],
  run: async ( client, message, args ) => {

    // Отфильтруйте args так, чтобы args были только форматами упоминания пользователя.
    args = args.filter(x => /<@!?\d{17,19}>/.test(x))

    const url = client.images.slap();
    const embed = new MessageEmbed()
    .setColor('BLACK')
    .setImage(url)
    .setFooter(`Action Commands | \©️${new Date().getFullYear()} Fran`);

    if ((message.guild && !message.mentions.members.size) || !args[0]){

      message.channel.send(`\\❌ **${message.author.tag}**, что за идея шлепать по небытию? Хотя бы упомяните пользователя!`);

    } else if (new RegExp(`<@!?${client.user.id}>`).test(args[0])){

      return message.channel.send([`Ай! Как ты смеешь бить меня!`,`Прекрати!`,`Больно!`][Math.floor(Math.random() * 3)]);

    } else if (new RegExp(`<@!?${message.author.id}>`).test(args[0])){

      return message.channel.send(`\\❌ Я бы с радостью согласилась! Но я думаю, что тебе нужна психологическая проверка. **${message.author.tag}**!`);

    } else {

      return message.channel.send(
        embed.setDescription(`${args[0]} получил пощечину${message.author}! Это должно быть больно~`)
      );

    };
  }
};
