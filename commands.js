// import
const fs = require('fs');

const commands = {};
const data = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.data.name] = command;
    data.push(command.data);
}

module.exports = { commands, data };