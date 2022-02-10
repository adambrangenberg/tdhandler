const slashCommands = require('./slashCommands.js');

module.exports = {
    name: "interactionCreate",
    once: false,

    run: async function (interaction) {
        if (interaction.isCommand()) {
            await slashCommands.run(interaction, interaction.client);
            console.log("slash")
        }
    }
}