// import
const {createWriteStream} = require('fs');
const {pipeline} = require('stream');
const {promisify} = require('util');
const fetch = require("node-fetch");
const prefix = "!";

/**
 * メンションされた時の動作
 */
const name = 'messageCreate';

const handler = async message => {

    if (message.author.bot) return;
    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command == "voicetext") {
    const t = args.join(" ");
    const m = Math.random().toString(36).slice(2, 12);
    const streamPipeline = promisify(pipeline);

    const response = await fetch(`https://www.google.com/speech-api/v1/synthesize?text=${encodeURI(t)}&nc=mpeg&lang=ja&speed=0.5&client=lr-language-tts`);

    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

    await streamPipeline(response.body, createWriteStream(`./${m}.mp3`));
    message.channel.send("結果:", {files: [`./${m}.mp3`]});
    }
};

module.exports = { name, handler }