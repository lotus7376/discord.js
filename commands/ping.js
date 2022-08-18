// import
const { messageInformation } = require('../property.js');

/**
 * pongと返信する
 */
module.exports = {
    data: {
        name: "ping",
        description: "reply pong!"
    },

    async execute(interaction) {
        await interaction.reply("pong!");

        console.log();
        console.log("execution complete: " + interaction.commandName);
        messageInformation(interaction);
    },
};