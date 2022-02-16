const { readdirSync } = require("fs");
const { join } = require("path");
const { table } = require("table")
const { tableConfig } = require("../config");
const { MessageButton } = require("discord.js");


/**
 * @async
 * @param {String} base
 * @param {String} dir
 * @param {Client} client
 * @param {TDInstance} tdhandler
 */
module.exports = async (base, dir, client, tdhandler) => {
    console.log("Loading buttons...")
    const data = [
        ["Button", "Status"]
    ];

    const files = readdirSync(join(base, dir)).filter(file => file.endsWith(".js"));
    for (const file of files) {
        const button = require(join(base, dir, file));
        let status = "Unloaded";

        if (button.button) {
            const buttonObject = new MessageButton(button.button)

            client.buttons.set(button.button.customId, button);
            tdhandler.buttons.set(button.button.customId, buttonObject)
            status = "Loaded"
        }

        data.push([file, status])
    }

    console.log(table(data, tableConfig));
}