const { MessageEmbed, Permissions: { FLAGS }} = require('discord.js');

module.exports = {
  name             : 'blush',
  description      : 'Отправляет в чат ролевой gif-файл `blush`, направленный на указанного пользователя, если таковой имеется.',
  aliases          : [],
  cooldown         : null,
  clientPermissions: [ FLAGS.EMBED_LINKS, FLAGS.ADD_REACTIONS ],
  permissions      : [],
  group            : 'action',
  guildOnly        : true,
  ownerOnly        : false,
  adminOnly        : false,
  nsfw             : false,
  requiresDatabase : false,
  rankcommand      : false,
  parameters       : [ 'User Mention' ],
  examples         : [ 'blush @user' ],
  run              : async (message, language, args) => {

    const parameters = new language.Parameter({ '%AUTHOR%': message.author.tag });
    let   member;
    if (!args){

    };
    if (!args.join(' ').match(/\d{17,19}/)){
      const members = await message.guild.members.fetch({ query: args.join(' '), limit: 5 }).catch(err => {});
      if (!members.size){

      };
      if (members.size > 1){

      };
      member = members.first();
    };
    if (args.join(' ').match(/\d{17,19}/)){
      member = await message.guild.members.fetch(args.join(' ').match(/\d{17,19}/)[0]).catch(err => err);
      if (member instanceof Error){

      };
    };
    if (member.id === message.client.user.id){

    };
    if (member.id === message.author.id){

    };
    return;
  }
};
