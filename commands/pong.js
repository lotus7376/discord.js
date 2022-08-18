// import
const { messageInformation } = require('../property.js');

/**
 * pingと返信する
 */
module.exports = {
    data: {
        name: "pong",
        description: "reply ping!"
    },

    async execute(interaction) {
        await interaction.reply("ping!");

        console.log();
        console.log("execution complete: " + interaction.commandName);
        messageInformation(interaction);
    },
};