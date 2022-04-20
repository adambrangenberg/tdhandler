const {readdirSync, lstatSync} = require("fs");
const {join} = require("path");
const {table} = require("table")
const {tableConfig} = require("../config");

/**
 * @async
 * @param {String} base
 * @param {String} dir
 * @param {Map} commandsMap
 * @param {String} testBotID
 */
module.exports = async (base, dir, commandsMap, testBotID) => {
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
            if (command.name) {
                if (command.development && testBotID === client.id) continue;

                commandsMap.set(command.name, command);
                if (command.description) {
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
    console.log(`${table(data, tableConfig)}`);
    return commands;
}