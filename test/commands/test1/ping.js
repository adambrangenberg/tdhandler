module.exports = {
    name: "ping",
    description: "well ping...",
    options: null,
    development: false,
    ownerOnly: false,
    colldown: 10,
    permissions: null,

    run: async(interaction, client, user, member) => {
           interaction.reply("hi");
    }
}