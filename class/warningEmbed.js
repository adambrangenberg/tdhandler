const { MessageEmbed } = require("discord.js");

module.exports = class warningEmbed extends MessageEmbed {
    constructor() {
        super()
        super.setColor(this.warningEmbed.color);
        super.setTitle(this.warningEmbed.title);
        super.setFooter({
            text: this.warningEmbed.footer,
            iconURL: this.warningEmbed.footerIcon
        });

        if (this.warningEmbed.timestamp) {
            super.setTimestamp();
        }
    }
}