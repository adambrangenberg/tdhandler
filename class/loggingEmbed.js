const { MessageEmbed } = require("discord.js");

module.exports = class loggingEmbed extends MessageEmbed {
    constructor() {
        super()
        super.setColor(this.loggingEmbed.color);
        super.setTitle("New Log!");
        if (this.loggingEmbed.timestamp) {
            super.setTimestamp();
        }
    }
}