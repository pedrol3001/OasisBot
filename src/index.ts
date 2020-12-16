import * as dotenv from 'dotenv';
import Discord from 'discord.js';
import SystemManager from './managers/system_manager';
import { createConnection, getConnection } from 'typeorm';

dotenv.config();

const client = new Discord.Client();

var ready = false;



client.on('ready', async () => {
  try {

    await createConnection()
      .then((connection) => { console.log("Connection - " + connection.name) })
      .catch((err) => { console.error("Cant connect to db - " + err) });

    SystemManager.init(client);
    await SystemManager.getInstance().setGuildsFromCache();

    ready = true;
    console.log(`Logged in as ${client.user.tag}!`);


  } catch (err) {
    console.error(err);
  }


});
client.on('guildCreate', async (guild: Discord.Guild) => {
  try {

    SystemManager.getInstance().addGuild(guild.id);

  } catch (err) {
    console.error(err);
  }

});

client.on('guildDelete', async (guild: Discord.Guild) => {
  try {

    console.log(SystemManager.getInstance().rmGuild(guild.id) ? `Guild ${guild.name} deleted` : `Error deleting the guild ${guild.name}`);

  } catch (err) {
    console.error(err);
  }

});

client.on('message', (msg: Discord.Message) => {
  try {

    if (ready == true) {

      if (msg.author.bot) return;

      let prefix;

      if (msg.guild) {

        let guild = SystemManager.getInstance().getGuild(msg.guild.id);

        if (process.env.PREFIX && msg.content.startsWith(process.env.PREFIX)) prefix = process.env.PREFIX; // global prefix

        if (guild.prefix && msg.content.startsWith(guild.prefix)) prefix = guild.prefix; // guild prefix

        if (!prefix) return;

        msg.content = msg.content.slice(prefix.length);

        console.log(msg.content);

        SystemManager.getInstance().commandHandler.executeMsg(msg) ||
          SystemManager.getInstance().getGuild(msg.guild.id).commandHandler.executeMsg(msg);
      } else {

        if (msg.content.startsWith(process.env.PREFIX)) {
          msg.content = msg.content.slice(process.env.PREFIX.length);
        }

        console.log(msg.content);

        SystemManager.getInstance().commandHandler.executeMsg(msg)
      }



    } else {
      msg.channel.send("Bot still loading");
    }


  } catch (err) {
    console.error(err);
  }


});

client.login(process.env.DISC_TOKEN);
