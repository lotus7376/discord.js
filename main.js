// import
const { token, serverId } = require('./.config.json');
const { commands, data } = require('./commands.js');
const events = require('./events.js');
const { client, messageInformation } = require('./property.js');


// 起動時動作
client.once('ready', async () => {
    // コマンドリセット
    client.guilds.cache.get(serverId).commands.set([])
        .then(console.log)
        .catch(console.error);

    // コマンドセット
    await client.application.commands.set(data, serverId);

    // プレイしているゲームの設定
    client.user.setActivity("/ping", { type: "PLAYING" });

    console.log("--------------------");
    console.log("application ready");
});

/**
 * コマンド実行時のイベント
 */
client.on('interactionCreate', async (interaction) => {
    if (interaction.user.bot) return;
    if (!interaction.isCommand()) return;

    try {
        console.log("----------");
        console.log("running " + interaction.commandName);
        messageInformation(interaction);

        await commands[interaction.commandName].execute(interaction);
    } catch (error) {
        console.log(error);
        await interaction.reply("エラーが発生しました。");
    }
});

// イベントセット
events.forEach(({ name, handler }) => client.on(name, handler));

// botの起動とdiscordサーバーへの接続
client.login(token);