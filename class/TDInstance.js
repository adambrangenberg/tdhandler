const {MessageButton, MessageEmbed} = require("discord.js");

/** Create a new TDInstance. */
module.exports = class TDInstance {
    // @TODO: Import logging as a string
    /**
     * @param {{logging: {eventsID: number, selectorsID: number, contextID: number, buttonsID: number, commandsID: number}, handling: {buttonsDir: string, commandsDir: string, eventsDir: string, selectorsDir: string, contextDir: string}, team: [{tag: string, id: number, position: string}], embeds: {loggingEmbed: {color: string, timestamp: boolean}, defaultEmbed: {color: string, footer: string, timestamp: boolean}, warningEmbed: {color: string, footer: string, title: string, timestamp: boolean}}}} options - the options to create a new instance
     * @param {Object} options.handling - the directory's which implies the files to handle
     * @param {String} options.handling.baseDir - the base-path of the directory's
     * @param {String} options.handling.eventsDir - the events directory
     * @param {String} options.handling.commandsDir - the commands directory
     * @param {String} options.handling.buttonsDir - the buttons directory
     * // @TODO: add @param {String} options.handling.selectorsDir - the selectors directory
     * @param {String} options.handling.contextDir - the contexts directory
     *
     * @param {Object} options.logging - the IDs of the channels to log in
     * @param {String} options.logging.eventsID - the ID of the channel to log events in
     * @param {String} options.logging.commandsID - the ID of the channel to log commands in
     * @param {String} options.logging.buttonsID - the ID of the channel to log buttons in
     * //@TODO: add @param {String} options.logging.selectorsID - the ID of the channel to log selectors in
     * @param {String} options.logging.contextID - the ID of the channel to log contexts in
     * @param {String} options.logging.othersID - the ID of the channel to log other things in
     *
     * @param {Object} options.embeds - the embeds configuration
     * @param {Object} options.embeds.warningEmbed - the embeds for warnings
     * @param {String} options.embeds.warningEmbed.color - the color of the embed
     * @param {String} options.embeds.warningEmbed.title - the title of the embed
     * @param {String} options.embeds.warningEmbed.footer - the footer of the embed
     * @param {String} options.embeds.warningEmbed.footerIcon - the footer icon of the embed
     * @param {Boolean} options.embeds.warningEmbed.timestamp - if there should be a timestamp or not
     * @param {Object} options.embeds.defaultEmbed - the embeds for a default reply
     * @param {String} options.embeds.defaultEmbed.color - the color of the embed
     * @param {String} options.embeds.defaultEmbed.footer - the footer of the embed
     * @param {String} options.embeds.defaultEmbed.footerIcon - the footer icon of the embed
     * @param {Boolean} options.embeds.defaultEmbed.timestamp - if there should be a timestamp or not
     * @param {Object} options.embeds.loggingEmbed - the embeds for logs
     * @param {String} options.embeds.loggingEmbed.color - the color of the embed
     * @param {Boolean} options.embeds.loggingEmbed.timestamp - if there should be a timestamp or not
     *
     * @param {Array} options.team - the team of the bot
     * @param {Object} options.team[] - the team member
     * @param {String} options.team[].tag - the tag of the member
     * @param {String} options.team[].id - the ID of the member
     * @param {String} options.team[].position - the position of the member
     *
     * @param {String} options.testing.botID - the ID of the test-bot
     * @param {String} options.testing.guildID - the ID of the test-guild
     */
    constructor(options) {
        // this.options = options;

        const handling = options.handling;
        this.baseDir = handling.baseDir;
        this.eventsDir = handling.eventsDir;
        this.commandsDir = handling.commandsDir;
        this.buttonsDir = handling.buttonsDir;
        // this.selectorsDir = handling.selectorsDir;
        this.contextDir = handling.contextDir;

        this.loggingIDs = options.logging;

        const embeds = options.embeds;
        this.warningEmbed = embeds.warningEmbed;
        this.defaultEmbed = embeds.defaultEmbed;
        this.loggingEmbed = embeds.loggingEmbed;

        this.team = options.team;

        const testing = options.testing;
        this.testBotID = testing.botID;
        this.testGuildID = testing.guildID;

        global.tdhandler = this;
    }

    // Private variables for loading purposes
    #commands = new Map();
    #menus = new Map();
    #buttons = new Map();
    #logging = new Map();

    /**
     @async
     @param {Client} client - the Discord Client
     */
    async init(client) {
        this.client = client;

        for (const id in this.loggingIDs) {
            this.#logging.set(id.replace("ID", ""), this.loggingIDs[id]);
        }

        // Loading own files
        await require('../loading/events.js')(__dirname, '../handling', this.client, true);
        let context;
        let command;

        // Loading users files
        if (this.eventsDir) await require('../loading/events.js')(this.baseDir, this.eventsDir, this.client, false);
        if (this.commandsDir) command = await require('../loading/commands.js')(this.baseDir, this.commandsDir, this.#commands, this.testBotID);
        if (this.buttonsDir) await require('../loading/buttons.js')(this.baseDir, this.buttonsDir, this.#buttons);
        if (this.contextDir) context = await require('../loading/context.js')(this.baseDir, this.contextDir, this.#menus, this.testBotID);

        // Putting commands and context menus into one array
        const api = command && context || content ? command.concat(context) : command ? command : context;

        if (!api) {
            console.log("TDHandler is ready!");
            return true;
        }

        // Registering the commands and menus
        if (this.testBotID === client.user.id) {
            console.log("Registering commands and menus in the test guild...");
            await client.application.commands.set(api, this.testGuildID);
        } else {
            console.log("Registering commands and menus for all guilds... \n");
            await client.application.commands.set(api);
        }

        console.log("TDHandler is ready! The commands may take a while to show up...");
        return true;
    }

    /**
     * @returns {Object} - the loading variables
     */
    get loadingVariables() {
        return {
            commands: this.#commands,
            menus: this.#menus,
            buttons: this.#buttons,
            logging: this.#logging
        }
    }

    /**
     @return {Client} client - the instance client
     */
    get getClient() {
        return this.client;
    }

    /**
     * @param {String} id
     * @returns {Channel | boolean} channel
     */
    getChannel(id) {
        if (!id) return false;
        return this.client.channels.fetch(id) || false;
    };

    /**
     * @param {String} text
     * @param {String} channel
     */
    async log(text, channel) {
        const foundChannel = await this.getChannel(this.#logging.get(channel));
        if (!foundChannel || !(foundChannel.isThread() || foundChannel.isText())) return false;
        const embed = this.createEmbed("log");
        embed.setDescription(String(text));
        foundChannel?.send({
            embeds: [embed]
        });
        return true;
    };

    /**
     * @param {String} name
     * @returns {MessageButton}
     */
    getButton(name) {
        return new MessageButton(this.#buttons.get(name)?.button);
    }

    // @TODO Create a class for the embeds
    /**
     * @param {String} type - the type of the embed
     * @return {MessageEmbed} - the embed
     */
    createEmbed(type) {
        const aliases = {
            warning: ["warn", "w", "error", "e"],
            logging: ["log", "l"],
        }

        for (const alias in aliases) {
            if (aliases[alias].includes(type)) {
                type = alias;
            }
        }

        const embed = new MessageEmbed();

        switch (type) {
            case "warning":
                this.warningEmbed.color ? embed.setColor(this.warningEmbed.color) : null;
                this.warningEmbed.title ? embed.setTitle(this.warningEmbed.title) : null;
                this.warningEmbed.footer && this.warningEmbed.footerIcon ? embed.setFooter({
                    text: this.warningEmbed.footer,
                    iconURL: this.warningEmbed.footerIcon
                }) : null;
                this.warningEmbed.timestamp ? embed.setTimestamp() : null;
                break;
            case "logging":
                this.loggingEmbed.color ? embed.setColor(this.loggingEmbed.color) : null;
                embed.setTitle("New Log!");
                this.loggingEmbed.timestamp ? embed.setTimestamp() : null;
                break;
            default:
                this.defaultEmbed.color ? embed.setColor(this.defaultEmbed.color) : null;
                this.defaultEmbed.footer && this.defaultEmbed.footerIcon ? embed.setFooter({
                    text: this.defaultEmbed.footer,
                    iconURL: this.defaultEmbed.footerIcon
                }) : null;
                this.defaultEmbed.timestamp ? embed.setTimestamp() : null;
                break;
        }

        return embed;
    }
}
