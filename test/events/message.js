module.exports = {
    name: "messageCreate",
    once: false,
    run: function (message) {
        const tdhandler = message.client.tdhandler;

        if (message.author.bot) return;
        const embed = tdhandler.createEmbed("l");
        embed.setDescription("hii");
        message.reply({
            embeds: [embed]
        })
    }
}