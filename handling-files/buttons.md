---
description: The properties a button-file can have
---

# 🔘 Buttons

```javascript
module.exports = {
    // The MessageButton Options, customId is going to be its name
    button: {
        label: "help",
        customId: "help",
        style: "PRIMARY",
        disabled: false
    },
    // The permissions required by the client to click that button
    clientPermissions: null,
    // The permissions required by the client to click that button
    userPermissions: null,

    // The code to run that button
    run: (interaction, client, tdhandler, user, member) => {
        interaction.reply({
            content: "help I am under the water",
        })
    }
}
```
