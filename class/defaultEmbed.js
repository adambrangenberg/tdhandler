const { MessageEmbed } = require("discord.js");

module.exports = class defaultEmbed extends MessageEmbed {
    constructor() {
        super()
        super.setColor(this.defaultEmbed.color);
        super.setFooter({
            text: this.defaultEmbed.footer,
            iconURL: this.defaultEmbed.footerIcon
        });
        if (this.defaultEmbed.timestamp) {
            super.setTimestamp();
        }
    }
}