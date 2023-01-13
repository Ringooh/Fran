const path = require('path');
const getAllFiles = require('../util/getAllFiles');

module.exports = (client) => {
  const commandFolders = getAllFiles(path.join(__dirname, '..', 'command'), true);

  for (const commandFolder of commandFolders) {
    const commandFiles = getAllFiles(commandFolder);
    commandFiles.sort((a, b) => a > b);

    const commandName = commandFolder.replace(/\\/g, '/').split('/').pop();

    client.on(commandName, async (arg) => {
      for (const commandFile of commandFiles) {
        const commandFunction = require(commandFile);
        await commandFunction(client, arg);
      }
    });
  }
};
