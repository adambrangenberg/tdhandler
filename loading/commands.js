const { readdirSync, lstatSync } = require("fs");
const { join } = require("path");
const { table } = require("table")
const { tableConfig } = require("../config");

/**
 * @async
 * @param {String} base
 * @param {String} dir
 * @param {Client} client
 * @param {String} testBotID
 * @param {String} testGuildID
 */
module.exports = async (base, dir, client, testBotID, testGuildID) => {
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
            let status = "Unloaded";
            const command = require(join(base, dir, folder, file));
            if (command.name && command.description) {
                if (command.development && testBotID === client.id) continue;
                if (command.name) {
                    client.commands.set(command.name, command);

                    commands.push({
                        name: command.name,
                        description: command.description,
                        options: command.options,
                    });

                    status = "Loaded";
                }
            }
            data.push([file, status, folder]);
        }
    }

    if (testBotID === client.id) {
        await client.application.commands.set(commands, testGuildID);
        console.log("Registered commands in the test guild")
    } else {
        client.guilds.cache.each(async (guild) => {
            await client.application.commands.set(commands, guild.id);
        });
        console.log("Registered commands in all guilds")
    }

    console.log(`${table(data, tableConfig)}\n`);
}