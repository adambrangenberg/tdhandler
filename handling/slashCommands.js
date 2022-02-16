const {Collection} = require("discord.js");
const cooldowns = new Collection()

module.exports = {
    name: 'slashCommands',
    event: false,

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     * @return {Boolean} success - If the command was executed successfully
     */
    run: async (interaction, client) => {
        const command = client.commands.get(interaction.commandName);
        if (!command) return false;

        if (command.development) {
            let run = false;
            for (const person of tdhandler.team) {
                if (person.id == interaction.user.id) {
                    run = true
                }
            }
            if (!run) return false;
        }

        if (command.clientPermissions) {
            if (!interaction.channel.permissionsFor(client.user).has(command.clientPermissions)) {
                const missingPermissions = command.clientPermissions
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

        if (command.userPermissions) {
            if (!interaction.channel.permissionsFor(interaction.user).has(command.userPermissions)) {
                const missingPermissions = command.userPermissions
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

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(interaction.member.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                interaction.reply({
                    content: `Wait another \`${timeLeft.toFixed(1)}\`seconds before you run **${command.name}** again!`,
                    ephemeral: true,
                });

                return false;
            }
        }

        try {
            command.run(interaction, client, tdhandler, interaction.user, interaction.member);
        } catch (error) {
            await tdhandler.log(error, "error", "other");
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        return true;
    }
}