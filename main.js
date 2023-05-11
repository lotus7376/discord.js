//ページ設定
const http = require("http");
http
  .createServer(function (req, res) {
    res.write("updated");
    res.end();
  })
  .listen(8080);

// import
const { execSync } = require("child_process");
const { ActivityType, InteractionType } = require("discord.js");
const token = process.env["TOKEN"];
// const serverId = process.env['SERVER_ID'];
const { commands, data } = require("./commands.js");
const events = require("./events.js");
const { client } = require("./property/client.js");
const { messageInformation } = require("./property/information.js");

// 起動時動作
client.once("ready", async () => {
  // コマンドリセット
  /*
  client.guilds.cache.get(serverId).commands.set([])
    .then(console.log)
    .catch(console.error);
  */
  // コマンドセット
  await client.application.commands.set(data);

  // プレイしているゲームの設定
  client.user.setActivity("/add", { type: ActivityType.Playing });

  console.log("--------------------");
  console.log("application ready");
});

/**
 * コマンド実行時のイベント
 */
client.on("interactionCreate", async (interaction) => {
  if (interaction.user.bot) return;
  if (interaction.type !== InteractionType.ApplicationCommand) return;

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
try {
  console.log("loading...");
  let log = client.login(token);

  let errFlg = true;
  log.then(
    function () {
      console.log("login successful");
      errFlg = false;
    },
    function () {
      console.log("login failure");
    }
  );

  setTimeout(function () {
    if (errFlg) {
      execSync("kill 1");
    }
  }, 10000);
} catch (error) {
  console.log(error);
  execSync("kill 1");
}
