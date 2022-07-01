// import
const { client } = require('../property.js');

/**
 * メンションされた時の動作
 */
const name = 'messageCreate';

const handler = async message => {
    if (message.author.bot) return;
    if (message.mentions.has(client.user)) {
        await message.reply("Hello, World!");

        console.log();
        console.log("mentioned by " + message.author.id);
        console.log("in " + message.guildId);
    }
}

module.exports = { name, handler };