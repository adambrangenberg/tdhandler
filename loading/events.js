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
        let status = "Loaded";
        let type = "None";

        switch (event.once) {
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

    if (!own) {
        console.log(table(data, tableConfig));
    }
}