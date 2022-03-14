---
description: The Properties a command-file can have
---

# ❗ Commands

**File structure:**\
****Commands Folder\
\-> Category Folder\
\-> -> Command File

```javascript
module.exports = {
    // The command-name
    name: "ping",
    // The command-description
    description: "pingi",
    // The command-options
    options: null,
    // Whether the command is in development or not
    development: false,
    // The cooldown of the command in seconds, default is 1 second
    cooldown: 1,
    // The permissions required by the client to perform that command
    clientPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    // The permissions required by the user to perform that command
    userPermissions: ["VIEW_CHANNEL"],
    
    // The code to run that command
    run: (interaction, client, tdhandler, user, member) => {
        interaction.reply({
            content: "hi commander sir commander",
        })
    }
}
```
