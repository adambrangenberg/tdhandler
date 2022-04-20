const {readdirSync, lstatSync} = require("fs");
const {join} = require("path");
const {table} = require("table")
const {tableConfig} = require("../config");

/**
 * @async
 * @param {String} base
 * @param {String} dir
 * @param {Client} client
 * @param {Map} commandsMap
 * @param {String} testBotID
 * @param {String} testGuildID
 */
module.exports = async (base, dir, client, commandsMap, testBotID, testGuildID) => {
    console.log("Loading Commands...")
    const data = [
        ["Command", "Status", "Directory"]
    ];
    const commands = [];
    const folders = readdirSync(join(base, dir));

    for (const folder of folders) {
        const stats = await lstatSync(join(base, dir, folder));
        if (!stats.isDirectory()) continue;

        const files = readdirSync(join(base, dir, folder)).filter(file => file.endsWith(".js"));
        for (const file of files) {
            const command = require(join(base, dir, folder, file));
            if (command.ignoreLoading) continue;

            let status = "Unloaded";
            if (command.name && command.description) {
                if (command.development && testBotID === client.id) continue;

                commandsMap.set(command.name, command);

                commands.push({
                    name: command.name,
                    description: command.description,
                    options: command.options,
                });

                status = "Loaded";

            }
            data.push([file, status, folder]);
        }
    }
    console.log(`${table(data, tableConfig)}`);
    const commandString = commands.length > 1 ? "commands" : "command";
    console.log(`Registering ${commands.length} ${commandString}...`);

    if (testBotID === client.user.id) {
        for (const command of commands) {
            await client.application.commands.create(command, testGuildID);
        }
        console.log("Registered commands in the test guild\n")
    } else {
        client.guilds.cache.each(async (guild) => {
            for (const command of commands) {
                await client.application.commands.create(command, guild.id);
            }
        });
        console.log("Registered commands in all guilds\n")
    }
}