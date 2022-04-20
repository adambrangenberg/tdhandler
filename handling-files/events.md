---
description: The properties an event-file can have
---

# ⛺ Events

**File structure:**\
****Events Folder\
\-> Event File

```javascript
module.exports = {
    // The event-name
    name: "messageCreate",
    // Wherther the event fires once or always
    once: false,
    // This allows you to ignore the file in the loading process
    ignoreLoading: false,
    
    // The code to run that event
    run: message => {
        if (message.author.bot) return;
        message.reply("Whoa that's an insane event");
    }
}
```
