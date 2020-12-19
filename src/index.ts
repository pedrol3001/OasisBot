import * as dotenv from 'dotenv';
import Discord from 'discord.js';
import { createConnection } from 'typeorm';
import SystemManager from './managers/system_manager';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const client = new Discord.Client();

client.on('ready', () => {
  try {
    createConnection()
      .then(connection => {
        console.log(`Connection - ${connection.name}`);
        SystemManager.init(client).then(() => {
          console.log(`Logged in as ${client.user.tag}!`);
        });
      })
      .catch(err => {
        console.error(`Cant connect to db - ${err}`);
      });
  } catch (err) {
    console.error(err);
  }
});

client.on('guildCreate', (guild: Discord.Guild) => {
  try {
    SystemManager.getInstance().addGuild(guild);
  } catch (err) {
    console.error(err);
  }
});

client.on('guildDelete', (guild: Discord.Guild) => {
  try {
    console.log(
      SystemManager.getInstance().rmGuild(guild.id)
        ? `Guild ${guild.name} deleted`
        : `Error deleting the guild ${guild.name}`,
    );
  } catch (err) {
    console.error(err);
  }
});

client.on(
  'message',
  async (msg: Discord.Message): Promise<void> => {
    try {
      if (SystemManager.getInstance().ready) {
        if (msg.author.bot) return;

        let prefix;

        if (msg.guild) {
          const guild = SystemManager.getInstance().getGuild(msg.guild.id);

          if (process.env.PREFIX && msg.content.startsWith(process.env.PREFIX))
            prefix = process.env.PREFIX; // global prefix

          if (guild.prefix && msg.content.startsWith(guild.prefix))
            prefix = guild.prefix; // guild prefix

          if (!prefix) return;

          // eslint-disable-next-line no-param-reassign
          msg.content = msg.content.slice(prefix.length);

          // eslint-disable-next-line no-unused-expressions
          (await SystemManager.getInstance().commandHandler.executeMsg(msg)) ||
            (await SystemManager.getInstance()
              .getGuild(msg.guild.id)
              .commandHandler.executeMsg(msg));
        } else {
          if (msg.content.startsWith(process.env.PREFIX)) {
            // eslint-disable-next-line no-param-reassign
            msg.content = msg.content.slice(process.env.PREFIX.length);
          }

          console.log(msg.content);

          await SystemManager.getInstance().commandHandler.executeMsg(msg);
        }
      } else {
        msg.channel.send('Bot still loading');
      }
    } catch (err) {
      console.error(err);
    }
  },
);

client.login(process.env.DISC_TOKEN);
