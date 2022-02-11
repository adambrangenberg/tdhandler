const { Client } = require('discord.js');
const { TDInstance } = require('../index.js');
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
        eventsID: "935914636899938354",
        commandsID: "935914636899938354",
        buttonsID: "935914636899938354",
        selectorsID: "935914636899938354",
        contextID: "935914636899938354",
        otherID: "935914636899938354",
    },
    embeds: {
        warningEmbed: {
            color: "RED",
            title: "warning",
            footer: "warn",
            footerIcon: "https://i.imgur.com/Z2xrQYh.png",
            timestamp: false,
        },
        defaultEmbed: {
            color: "BLUE",
            footer: "default",
            footerIcon: "https://cdn.discordapp.com/embed/avatars/0.png",
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
            id: "412021620572422155",
            position: "owner",
        },
    ],
    testing: {
        botID: "803017957528698913",
        guildID: "751938789412175974"
    }
});

client.login(process.env.TOKEN).then();

client.on('ready', () => {
    console.log('Ready!');
    tdhandler.init(client, tdhandler).then(() => console.log('TDHandler ready!'));
});