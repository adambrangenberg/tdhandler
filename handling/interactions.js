const slashCommands = require('./slashCommands.js');

module.exports = {
    name: "interactionCreate",
    once: false,
    event: true,

    run: async function (interaction) {
        const tdhandler = interaction.client.tdhandler

        if (interaction.isCommand()) {
            const success = await slashCommands.run(interaction, interaction.client);
            if (success)
                tdhandler.log(
                    `${interaction.user.username} executed ${interaction.commandName} in ${interaction.guild.name}.`,
                    "log",
                    "commands"
                );
        }
    }
}