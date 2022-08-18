// import
const fs = require('fs');

const events = [];
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    events.push(require(`./events/${file}`));
}


module.exports = events