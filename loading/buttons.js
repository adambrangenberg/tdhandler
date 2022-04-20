const { readdirSync } = require("fs");
const { join } = require("path");
const { table } = require("table")
const { tableConfig } = require("../config");
const { MessageButton } = require("discord.js");


/**
 * @async
 * @param {String} base
 * @param {String} dir
 * @param {Map} buttons
 */
module.exports = async (base, dir, buttons) => {
    console.log("Loading buttons...")
    const data = [
        ["Button", "Status"]
    ];

    const files = readdirSync(join(base, dir)).filter(file => file.endsWith(".js"));
    for (const file of files) {
        const button = require(join(base, dir, file));
        if (button.ignoreLoading) continue;

        let status = "Unloaded";

        if (button.button) {
            buttons.set(button.button.customId, button);

            status = "Loaded"
        }

        data.push([file, status])
    }

    console.log(table(data, tableConfig));
}