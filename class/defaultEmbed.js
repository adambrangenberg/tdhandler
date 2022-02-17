const { MessageEmbed } = require("discord.js");

module.exports = class defaultEmbed extends MessageEmbed {
    constructor() {
        super()
        super.setColor(tdhandler.defaultEmbed.color);
        super.setFooter({
            text: tdhandler.defaultEmbed.footer,
            iconURL: tdhandler.defaultEmbed.footerIcon
        });
        if (tdhandler.defaultEmbed.timestamp) {
            super.setTimestamp();
        }
    }
}