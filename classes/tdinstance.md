---
description: This class allows you to start a new Instance of TDHandler
---

# 📦 TDInstance

## Options

This is an example of every option, every option is optional as long as you don't use a feature requiring it:

```javascript
new TDInstance({
    handling: {
        // The directory the other paths are oriented to
        baseDir: __dirname, 
        // The directory your events are located in
        eventsDir: "./events",
        // The directory your commands are located in
        commandsDir: "./commands",
        // The directory your buttons are located in
        buttonsDir: "./buttons",
        // The directory your context menus are located in
        contextDir: "./context",
    },
    logging: {
        // The ID of the channel your events should be logged in
        eventsID: "0123456789",
        // The ID of the channel your commands should be logged in
        commandsID: "0123456789",
        // The ID of the channel your buttons should be logged in
        buttonsID: "0123456789",
        // The ID of the channel your context menus should be logged in
        contextID: "0123456789",
        // The ID of the channel everything other should be logged in
        othersID: "0123456789"
    },
    embeds: {
        // The options for different default-embeds
        warningEmbed: {
            color: "RED",
            title: "warning",
            footer: "warn",
            footerIcon: "https://de.wikipedia.org/wiki/Datei:Ia-never-gonna-give-you-up-rick-astley-trionfale-remaster-4k-v3-500421.jpg",
            timestamp: false,
        },
        defaultEmbed: {
            color: "BLUE",
            footer: "default",
            footerIcon: "https://de.wikipedia.org/wiki/Datei:Ia-never-gonna-give-you-up-rick-astley-trionfale-remaster-4k-v3-500421.jpg",
            timestamp: false,
        },
        loggingEmbed: {
            color: "YELLOW",
            timestamp: false,
        },
    },
    // The members of your team
    team: [
        {
            tag: "Rick Astley",
            id: "0123456789",
            position: "meme",
        },
    ],
    testing: {
        // The ID of your testbot
        botID: "0123456789",
        // The ID of your testguild
        guildID: "0123456789",
    }
});
```

## Functions

[getClient](../functions/getclient.md): returns the [Client](https://discord.js.org/#/docs/discord.js/stable/class/Client) of the current Instance\
[getChannel](../functions/getchannel.md): returns a [Channel](https://discord.js.org/#/docs/discord.js/stable/class/Channel) object\
[log](../functions/log.md): allows you to log something if the logging channels\
[createEmbed](../functions/createembed.md): creates a customized [MessageEmbed](https://discord.js.org/#/docs/discord.js/stable/class/MessageEmbed)
