module.exports = {
    name: 'buttons',
    event: false,

    /**
     * @param {ButtonInteraction} interaction
     * @param {Client} client
     * @return {Boolean} success - If the command was executed successfully
     */
    run: async (interaction, client) => {
        const { buttons } = tdhandler.loadingVariables;
        console.log(buttons);
        console.log(interaction.customId)
        const button = buttons.get(interaction.customId);
        if (!button) return false;

        if (button.clientPermissions) {
            if (!interaction.channel.permissionsFor(client.user).has(button.clientPermissions)) {
                const missingPermissions = button.clientPermissions
                    .filter(perm => interaction.channel.permissionsFor(client.user).has(perm, true) === false)
                    .join("\`, \`");

                // @TODO: clientPerms - Add ability to add custom messages
                interaction.reply({
                    content: `I'm missing following permissions: ${missingPermissions}\`!`,
                    ephemeral: true,
                });

                return false;
            }
        }

        if (button.userPermissions) {
            if (!interaction.channel.permissionsFor(interaction.user).has(button.userPermissions)) {
                const missingPermissions = button.userPermissions
                    .filter(perm => interaction.channel.permissionsFor(interaction.user).has(perm, true) === false)
                    .join("\`, \`");

                // @TODO: userPerms - Add ability to add custom messages
                interaction.reply({
                    content: `I'm missing following permissions: ${missingPermissions}\`!`,
                    ephemeral: true,
                });

                return false;
            }
        }

        try {
            button.run(interaction, client, tdhandler, interaction.user, interaction.member);
        } catch (error) {
            await tdhandler.log(error, "others");
        }

        return true;
    }
}