/**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */
module.exports = {
    name: 'slashCommands',
    event: false,

    run: async (interaction, client) => {
        interaction.channel.send("hi slashcommand");
        const command = client.commands.get(interaction.commandName);
        if (command);
    }
}