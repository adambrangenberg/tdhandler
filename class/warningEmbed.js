const { MessageEmbed } = require("discord.js");

module.exports = class warningEmbed extends MessageEmbed {
    constructor() {
        super()
        super.setColor(tdhandler.warningEmbed.color);
        super.setTitle(tdhandler.warningEmbed.title);
        super.setFooter({
            text: tdhandler.warningEmbed.footer,
            iconURL: tdhandler.warningEmbed.footerIcon
        });

        if (tdhandler.warningEmbed.timestamp) {
            super.setTimestamp();
        }
    }
}