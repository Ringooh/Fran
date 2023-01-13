const { MessageEmbed } = require('discord.js');

function check(message, command){
  const reasons = [];
  const guildProfile = message.client.guildProfiles.get(message.guild?.id);

  if (command.guildOnly){
    if (message.channel.type === 'dm'){
      reasons.push([
        '**Команда недоступна в DM**',
        'Эта команда может использоваться только внутри серверов.'
      ].join(' - '));
    } else {
      // Do nothing..
    };
  };

  if (message.channel.type !== 'dm'){
    if (command.ownerOnly){
      if (!message.client.owners.includes(message.author.id)){
        reasons.push([
          '**Только для разработчиков**',
          'Эту команду могут использовать только мои разработчики.'
        ].join(' - '));
      } else {
        // Do nothing..
      };
    };
    if (command.adminOnly){
      if (!message.member.hasPermission('ADMINISTRATOR')){
        reasons.push([
          '**Только для администраторов**',
          'Эту команду могут использовать только администраторы сервера.'
        ].join(' - '))
      } else {
        // Do nothing..
      };
    };
    if (Array.isArray(command.permissions)){
      if (!message.channel.permissionsFor(message.member).has(command.permissions)){
        reasons.push([
          '**Нет необходимых разрешений (пользователь)** - ',
          'Вам нужны следующие разрешения:\n\u2000\u2000- ',
          Object.entries(message.channel.permissionsFor(message.member).serialize())
          .filter( p => command.permissions.includes(p[0]) && !p[1])
          .flatMap(c => c[0].split('_').map(x => x.charAt(0) + x.toLowerCase().slice(1)).join(' '))
          .join('\n\u2000\u2000- ')
        ].join(''))
      } else {
        // Do nothing..
      };
    };
    if (Array.isArray(command.clientPermissions)){
      if (!message.channel.permissionsFor(message.guild.me).has(command.clientPermissions)){
        reasons.push([
          '**Нет необходимых разрешений (Hu Tao)** - ',
          'Мне нужны следующие разрешения:\n\u2000\u2000- ',
          Object.entries(message.channel.permissionsFor(message.guild.me).serialize())
          .filter(p => command.clientPermissions.includes(p[0]) && !p[1])
          .flatMap(c => c[0].split('_').map(x => x.charAt(0) + x.toLowerCase().slice(1)).join(' '))
          .join('\n\u2000\u2000- ')
        ].join(''))
      } else {
        // Do nothing..
      };
    };
    if (command.rankcommand){
      if (!guildProfile.xp.isActive || guildProfile.xp.exceptions.includes(message.channel.id)){
        reasons.push([
          !guildProfile.xp.isActive ? '**Отключенный XP**' : '**Отключенный XP на канале**',
          !guildProfile.xp.isActive ? 'XP в настоящее время отключена на этом сервере.' : ' XP в настоящее время отключен на этом канале.'
        ].join(' - '))
      } else {
        //Do nothing
      };
    };
  };

  if (command.nsfw) {
    if (!message.channel.nsfw){
      reasons.push([
        '**NSFW Command**',
        'Вы можете использовать эту команду только на канале nsfw.'
      ].join(' - '))
    };
  };

  if (command.requiresDatabase){
    if (!message.client.database?.connected){
      reasons.push([
        '**Не удается подключиться к базе данных**',
        'Эта команда требует подключения к базе данных.'
      ].join(' - '))
    };
  };

  const embed = new MessageEmbed()
  .setAuthor('Выполнение команды заблокировано!')
  .setColor('ORANGE')
  .setDescription(`Причины:\n\n${reasons.map(reason => '• ' + reason).join('\n')}`);

  if (reasons.some(str => str.startsWith('**Отключенный XP на канале'))){
    embed.addField('\u200b',`Если вы администратор сервера, вы можете повторно разблокировать его, набрав **${message.client.config.prefix}xpenable ${message.channel}**`);
  } else {
    // Do nothing..
  };

  if (reasons.some(str => str.startsWith('**Отключенный XP**'))){
    embed.addField('\u200b',`Если вы администратор сервера, вы можете повторно включить его, набрав \`${message.client.config.prefix}xptoggle\` команду`);
  } else {
    // Do nothing..
  };

  return { accept: !reasons.length, embed };
};

module.exports = { check };
