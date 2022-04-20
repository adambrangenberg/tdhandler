---
description: The properties a content menu-file can have
---

# 🧑🦲 Context Menus

**File structure:**\
****Contexts Folder\
\-> Category Folder\
\-> -> Context File

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
    // This allows you to ignore the file in the loading process
    ignoreLoading: false,
    
    // The code to run that menu
    run: (interaction, client, tdhandler, user, member) => {
        interaction.reply({
            content: "hi this have much context",
        })
    }
}
```
