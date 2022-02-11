module.exports = {
    name: "ping",
    description: "well ping...",
    options: null,
    development: false,
    ownerOnly: false,
    cooldown: 10,
    permissions: null,

    run: async(interaction, client, tdhandler, user, member) => {
           interaction.reply("hi");
    }
}