# 🚀 Get Started

## Requirements

1. At least Node.JS v.16
2. Discord.JS v.13
3. Latest version of TDHandler
4. A Discord Bot and its Token

## Create a start Instance

To start a new Instance, you need to create a new Object first (the options can be found [here](classes/tdinstance.md)):

```javascript
// Frist import the class
const { TDInstance } = require("TDHandler");

// then call the constructor
// the options can be found in the description of TDInstance class
new TDInstance(your options);
```

Then you need to log in with your Discord.JS Client and initialize the TDInstance:

```javascript
// Create the client object
const { Client } = require("discord.js");

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.on('ready', async () => {
    await tdhandler.init(client);
    console.log(`Logged in as ${client.user.username}`);
});

client.login(your bot token);
```
