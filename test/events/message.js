module.exports = {
    name: "messageCreate",
    once: false,
    run: function (message) {
        message.reply("hi")
    }
}