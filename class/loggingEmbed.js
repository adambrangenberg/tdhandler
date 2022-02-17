const { MessageEmbed } = require("discord.js");

module.exports = class loggingEmbed extends MessageEmbed {
    constructor() {
        super()
        super.setColor(tdhandler.loggingEmbed.color);
        super.setTitle("New Log!");
        if (tdhandler.loggingEmbed.timestamp) {
            super.setTimestamp();
        }
    }
}