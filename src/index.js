const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
});
// load env file (contains important keys)
require('dotenv').config();

const fs = require('fs');

const Client = require(`${process.cwd()}/struct/Client`);
const config = require(`${process.cwd()}/config`);

const client = new Client(config);


client.login();
