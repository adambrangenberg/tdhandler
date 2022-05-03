const { readdirSync } = require("fs");
const { join } = require("path");
const { table } = require("table")
const { tableConfig } = require("../config");

/**
 * @async
 * @param {String} base
 * @param {String} dir
 * @param {Client} client
 * @param {Boolean} own
 */
module.exports = async (base, dir, client, own) => {
    if (!own) {
        console.log("Loading Events...");
    }

    const data = [
        ["Event", "Type", "Status"]
    ];

    const files = readdirSync(join(base, dir)).filter(file => file.endsWith(".js"));
    for (const file of files) {
        const event = require(join(base, dir, file));
        if (event.ignoreLoading) continue;

        let status = "Unloaded";
        let type = "None";

        // ignore non events
        if (own && !event.event) continue;

        if (event.name) {
            switch (event.once) {
                case true:
                    type = "Once"
                    status = "Loaded"
                    client.once(event.name, event.run);
                    break;
                case false:
                    type = "On"
                    status = "Loaded"
                    client.on(event.name, event.run);
                    break;
                default:
                    break;
            }
        }
        data.push([file, type, status])
    }

    if (!own) {
        console.log(table(data, tableConfig));
        return data;
    }
}