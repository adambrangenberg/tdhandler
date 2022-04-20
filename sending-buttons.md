---
description: How to send a button
---

# 🔘 Sending Buttons

It is really easy to send a button, basically you just get it with the [getButton](methods/getbutton.md) method by its name and send it like in this example:

```javascript
const { MessageActionRow } = require("discord.js");

module.exports = {
    name: "ping",
    description: "pingi",
    options: null,
    development: false,
    cooldown: 1,
    clientPermissions: null,
    userPermissions: null,

    run: (interaction, client, tdhandler, user, member) => {
        const button = tdhandler.getButton("help")
        const row = new MessageActionRow().addComponents([button])

        interaction.reply({
            content: "hi click the button thx",
            components: [row]
        })
    }
}
```

How to create the button-file and its code is explained [here](handling-files/buttons.md)
