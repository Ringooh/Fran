const { readdirSync } = require('fs');
const { join } = require('path');
const { Intents } = require('discord.js');
const myIntents = new Intents();

// other examples:

const otherIntents = new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES]);
otherIntents.remove([Intents.FLAGS.DIRECT_MESSAGES]);

const otherIntents2 = new Intents(32509);
otherIntents2.remove(4096, 512);

/*REQUIRE FONTS*/
require('./fonts');
/*REQUIRE EXTENDED STRUCTURES*/
/*for (const file of readdirSync(join(__dirname, 'struct/Extends'))){
  require(join(__dirname, 'struct/Extends', file));
};*/
/*REQUIRE CLIENT*/
const Client = require('./struct/Client');

const activity = {
    name: 'https://ringooh.github.io/hutao-san/',
    type: 'COMPETING'
};

const dbConfig = {
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
    useNewUrlParser: true,
    autoIndex: false,
    poolSize: 5,
    family: 4
};

const client = new Client({
    presence: activity,
    database: dbConfig,
    messageCacheLifetime: 43200,
    messageSweepInterval: 43200,
    allowedMentions: { parse: [ 'users' ]},
    intents: myIntents,

    prefix  : 'f!',
    owners  : ['295525746623905792'],
    uploadch: '834101319320076310'
});

client.commands.load({ includeSlash: true });
//Only loads the slash commands on client, to load on specific guild, use guild#loadSlashCommands
client.loadEvents();

client.login();
