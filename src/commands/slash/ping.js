module.exports = {
  name: 'ping',
  description: 'Pong!',
  // devOnly: Boolean,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  run: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
