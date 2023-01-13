// load env file (contains important keys)
require('dotenv').config();
const fs = require('fs');

const { Client, IntentsBitField, ActivityType } = require('discord.js');
// const Handler = require('./handlers/commands');
// const Handle = require('./util/handle');
const eventHandler = require('./handlers/eventHandler');
const commandHandler = require('./handlers/handler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],

    prefix  : 'f!'
});

client.on('ready', () => {
    client.user.setPresence({
        activities: [{
            type: ActivityType.Competing,
            name: 'in rank up',
            status: "online"
        }]        
    });
});

eventHandler(client);


client.login(process.env.DISCORD_TOKEN);

