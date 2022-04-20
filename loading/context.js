const { readdirSync, lstatSync } = require("fs");
const { join } = require("path");
const { table } = require("table")
const { tableConfig } = require("../config");

/**
 * @async
 * @param {String} base
 * @param {String} dir
 * @param {Map} menusMap
 * @param {String} testBotID
 */
module.exports = async (base, dir, menusMap, testBotID) => {
    console.log("Loading context menus...")
    const data = [
        ["Command", "Status", "Directory"]
    ];
    const menus = [];
    const folders = readdirSync(join(base, dir));

    for (const folder of folders) {
        const stats = await lstatSync(join(base, dir, folder));
        if (!stats.isDirectory()) continue;

        const files = readdirSync(join(base, dir, folder)).filter(file => file.endsWith(".js"));
        for (const file of files) {
            const menu = require(join(base, dir, folder, file));
            if (menu.ignoreLoading) continue;

            let status = "Unloaded";
            if (menu.name && menu.type) {
                if (menu.development && testBotID === client.id) continue;
                if (menu.name) {
                    menusMap.set(menu.name, menu);

                    menus.push({
                        name: menu.name,
                        type: menu.type,
                    });

                    status = "Loaded";
                }
            }
            data.push([file, status, folder]);
        }
    }

    console.log(`${table(data, tableConfig)}`);
    return menus;
}