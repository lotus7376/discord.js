// import
const { Client, Intents } = require('discord.js');

// クライアントインスタンスの生成
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

messageInformation = function (interaction) {
    console.log("from: " + interaction.user.id);
    console.log("in: " + interaction.guildId);
}

completeMessage = function(interaction) {
    console.log();
    console.log("execution complete: " + interaction.commandName);
    messageInformation(interaction);
}

module.exports = { client, messageInformation, completeMessage };