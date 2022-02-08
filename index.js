
module.exports =
    /** Create a new TDInstance. */
    class TDInstance  {
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
     * @param {Number} options.logging.eventsID - the ID of the channel to log events in
     * @param {Number} options.logging.commandsID - the ID of the channel to log commands in
     * @param {Number} options.logging.buttonsID - the ID of the channel to log buttons in
     * @param {Number} options.logging.selectorsID - the ID of the channel to log selectors in
     * @param {Number} options.logging.contextID - the ID of the channel to log contexts in
     *
     * @param {Object} options.embeds - the embeds configuration
     * @param {Object} options.embeds.warningEmbed - the embeds for warnings
     * @param {String} options.embeds.warningEmbed.color - the color of the embed
     * @param {String} options.embeds.warningEmbed.title - the title of the embed
     * @param {String} options.embeds.warningEmbed.footer - the footer of the embed
     * @param {Boolean} options.embeds.warningEmbed.timestamp - if there should be a timestamp or not
     * @param {Object} options.embeds.defaultEmbed - the embeds for a default reply
     * @param {String} options.embeds.defaultEmbed.color - the color of the embed
     * @param {String} options.embeds.defaultEmbed.footer - the footer of the embed
     * @param {Boolean} options.embeds.defaultEmbed.timestamp - if there should be a timestamp or not
     * @param {Object} options.embeds.loggingEmbed - the embeds for logs
     * @param {String} options.embeds.loggingEmbed.color - the color of the embed
     * @param {Boolean} options.embeds.loggingEmbed.footer - if there should be a timestamp or not
     *
     * @param {Array} options.team - the team of the bot
     * @param {Object} options.team[] - the team member
     * @param {String} options.team[].tag - the tag of the member
     * @param {Number} options.team[].id - the ID of the member
     * @param {String} options.team[].position - the position of the member
     */
    constructor(options) {
        const handling = options.handling;
            this.baseDir = handling.baseDir;
            this.eventsDir = handling.eventsDir;
            this.commandsDir = handling.commandsDir;
            this.buttonsDir = handling.buttonsDir;
            this.selectorsDir = handling.selectorsDir;
            this.contextDir = handling.contextDir;

        const logging = options.logging;
            this.eventsID = logging.eventsID;
            this.commandsID = logging.commandsID;
            this.buttonsID = logging.buttonsID;
            this.selectorsID = logging.selectorsID;
            this.contextID = logging.contextID;

        const embeds = options.embeds;
            this.warningEmbed = embeds.warningEmbed;
            this.defaultEmbed = embeds.defaultEmbed;
            this.loggingEmbed = embeds.loggingEmbed;

        this.team = options.team;
    }

    /**
     @async
     @param {Client} client - the Discord Client
    */
    async init(client) {
        this.client = client;
        await require('./handling/events.js')(this.baseDir, this.eventsDir, this.client);
        // await loadCommands();
        // await loadButtons();
        // await loadSelectors();
        // await loadContexts();
    }
}