const { Collection, MessageEmbed } = require("discord.js");

/** Create a new TDInstance. */
module.exports.TDInstance = class TDInstance {
    // @TODO: Import logging as a string
    /**
     * @param {{logging: {eventsID: number, selectorsID: number, contextID: number, buttonsID: number, commandsID: number}, handling: {buttonsDir: string, commandsDir: string, eventsDir: string, selectorsDir: string, contextDir: string}, team: [{tag: string, id: number, position: string}], embeds: {loggingEmbed: {color: string, timestamp: boolean}, defaultEmbed: {color: string, footer: string, timestamp: boolean}, warningEmbed: {color: string, footer: string, title: string, timestamp: boolean}}}} options - the options to create a new instance
     * @param {Object} options.handling - the directory's which implies the files to handle
     * @param {String} options.handling.baseDir - the base-path of the directory's
     * @param {String} options.handling.eventsDir - the events directory
     * @param {String} options.handling.commandsDir - the commands directory
     * @param {String} options.handling.buttonsDir - the buttons directory
     * @param {String} options.handling.selectorsDir - the selectors directory
     * @param {String} options.handling.contextDir - the contexts directory
     *
     * @param {Object} options.logging - the IDs of the channels to log in
     * @param {String} options.logging.eventsID - the ID of the channel to log events in
     * @param {String} options.logging.commandsID - the ID of the channel to log commands in
     * @param {String} options.logging.buttonsID - the ID of the channel to log buttons in
     * @param {String} options.logging.selectorsID - the ID of the channel to log selectors in
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
     * @param {Boolean} options.embeds.loggingEmbed.footer - if there should be a timestamp or not
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
        this.selectorsDir = handling.selectorsDir;
        this.contextDir = handling.contextDir;

        this.logging = options.logging;

        const embeds = options.embeds;
        this.warningEmbed = embeds.warningEmbed;
        this.defaultEmbed = embeds.defaultEmbed;
        this.loggingEmbed = embeds.loggingEmbed;

        this.team = options.team;

        const testing = options.testing;
        this.testBotID = testing.botID;
        this.testGuildID = testing.guildID;
    }

    /**
     @async
     @param {Client} client - the Discord Client
     */
    async init(client) {
        this.client = client;
        this.client.commands = new Collection();
        this.client.logging = new Collection();
        this.client.tdhandler = this;

        for (const id in this.logging) {
            this.client.logging.set(id.replace("ID", ""), this.logging[id]);
        }

        console.log(typeof this.client.logging.get("commands"));

        // Loading own files
        await require('../loading/events.js')(__dirname, '../handling', this.client, true);

        // Loading users files
        await require('../loading/events.js')(this.baseDir, this.eventsDir, this.client, false);
        await require('../loading/commands.js')(this.baseDir, this.commandsDir, this.client, this.testBotID, this.testGuildID);
        // await loadButtons();
        // await loadSelectors();
        // await loadContexts();

    }

    /**
     @return {Object} options - the instance options
     */
    getOptions() {
        return this.options;
    }

    /**
     @return {Client} client - the instance client
     */
    getClient() {
        return this.client;
    }

    /**
     * @param {String} id
     * @returns {Channel} channel
     */
    getChannel(id) {
        return this.client.channels.fetch(id);
    };

    /**
     * @param {String} text
     * @param {String} type
     * @param {String} channel
     */
    async log(text, type, channel) {
        channel = await this.getChannel(this.client.logging.get(channel));
        const embed = this.createEmbed("log");
        embed.setDescription(text);
        channel.send({
            embeds: [embed]
        });
    };

    // @TODO Create a class for the embeds
    /**
     * @param {String} type - the type of the embed
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

        switch(type) {
            case "warning":
                embed.setColor(this.warningEmbed.color);
                embed.setTitle(this.warningEmbed.title);
                embed.setFooter({
                    text: this.warningEmbed.footer,
                    iconURL: this.warningEmbed.footerIcon
                });
                if (this.warningEmbed.timestamp) {
                    embed.setTimestamp();
                }
                break;
            case "logging":
                embed.setColor(this.loggingEmbed.color);
                embed.setTitle("New Log!");
                if (this.loggingEmbed.timestamp) {
                    embed.setTimestamp();
                }
                break;
            default:
                embed.setColor(this.defaultEmbed.color);
                embed.setFooter({
                    text: this.defaultEmbed.footer,
                    iconURL: this.defaultEmbed.footerIcon
                });
                if (this.defaultEmbed.timestamp) {
                    embed.setTimestamp();
                }
                break;
        }

        return embed;
    }
}
