const { readdirSync } = require("fs");
const { join } = require("path");
const { table } = require("table")
const { tableconfig } = require("../config");

/**
 * @async
 * @param {String} base
 * @param {String} dir
 * @param {Client} client
 */
module.exports = async (base, dir, client) => {
    console.log("Loading Events...")
    const data = [
        ["Event", "Type", "Status"]
    ];

    const files = readdirSync(join(base, dir));
    for (const file of files) {
        if (!file.endsWith(".js")) continue;

        const event = require(join(base, dir, file));
        let status = "Loaded";
        let type = "None";

        switch(event.once) {
            case true:
                type = "Once"
                client.once(event.name, event.run);
                break;
            case false:
                type = "On"
                client.on(event.name, event.run);
                break;
            default:
                status = "Deactivated";
                break;
        }
        data.push([file, type, status])
    }

    console.log(`${table(data, tableconfig)}\n`);
}