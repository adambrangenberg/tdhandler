---
description: The properties a content menu-file can have
---

# 🧑🦲 Context Menus



```javascript
module.exports = {
    // The menu-name
    name: "ping",
    // The menu-type
    type: "USER",
    // Whether the menu is in development or not
    development: false,
    // The cooldown of the menu in seconds, default is 1 second
    cooldown: 1,
    // The permissions required by the client to use that menu
    clientPermissions: null,
    // The permissions required by the user to use that menu
    userPermissions: null,
    
    // The code to run that menu
    run: (interaction, client, tdhandler, user, member) => {
        interaction.reply({
            content: "hi this have much context",
        })
    }
}
```
