const slashCommands = require('./slashCommands.js');
const button = require('./button.js');

module.exports = {
    name: "interactionCreate",
    once: false,
    event: true,

    run: async function (interaction) {
        if (interaction.isApplicationCommand()) {
            const success = slashCommands.run(interaction, interaction.client);
            if (success) {
                let type;

                if (interaction.isContextMenu()) {
                    type = "context";
                } else {
                    type = "commands";
                }

                await tdhandler.log(
                    `${interaction.user.username} executed ${interaction.commandName} in ${interaction.guild.name}.`,
                    type
                );
            }

            return true;
        }

        if (interaction.isButton()) {
            const success = button.run(interaction, interaction.client);
            if (success)
                await tdhandler.log(
                    `${interaction.user.username} pressed ${interaction.customId} in ${interaction.guild.name}.`,
                    "buttons"
                );

            return true;
        }
    }
}