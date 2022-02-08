// const path = require('path');
// console.log(typeof __dirname);

const { Client } = require('discord.js');
const TDInstance = require('../index.js');
require('dotenv').config();

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
});

const tdhandler = new TDInstance({
    handling: {
        baseDir: __dirname,
        eventsDir: "./events",
        commandsDir: "./commands",
        buttonsDir: "./buttons",
        selectorsDir: "./selectors",
        contextDir: "./context",
    },
    logging: {
        eventsID: 935914636899938354,
        commandsID: 935914636899938354,
        buttonsID: 935914636899938354,
        selectorsID: 935914636899938354,
        contextID: 935914636899938354,
    },
    embeds: {
        warningEmbed: {
            color: "RED",
            title: "warning",
            footer: "warn",
            timestamp: false,
        },
        defaultEmbed: {
            color: "BLUE",
            footer: "default",
            timestamp: false,
        },
        loggingEmbed: {
            color: "YELLOW",
            timestamp: false,
        },
    },
    team: [
        {
            tag: "Adam ^^#7729",
            id: 412021620572422155,
            position: "owner",
        },
    ],
});

client.login(process.env.TOKEN).then();

client.on('ready', () => {
    console.log('Ready!');
    tdhandler.init(client).then(() => console.log('TDHandler ready!'));
});