import * as dotenv from 'dotenv';
import Discord from 'discord.js';
import { createConnection } from 'typeorm';
import SystemManager from './managers/system_manager';
import DreamError from './handlers/error_handler';

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
        new DreamError('Cant connect to db', err).log();
      });
  } catch (err) {
    new DreamError('Error starting the bot', err).log();
  }
});

client.on('guildCreate', (guild: Discord.Guild) => {
  try {
    SystemManager.getInstance().addGuild(guild);
  } catch (err) {
    new DreamError('Error adding new guild', err, {
      guildId: guild.id,
      guild: guild.name,
    }).log();
  }
});

client.on('guildDelete', (guild: Discord.Guild) => {
  try {
    SystemManager.getInstance().rmGuild(guild.id);
  } catch (err) {
    new DreamError('Error deleting from the bot', err, {
      guildId: guild.id,
      guild: guild.name,
    }).log();
  }
});

client.on(
  'message',
  async (msg: Discord.Message): Promise<void> => {
    try {
      if (msg.author.bot) return;

      let prefix;

      if (msg.guild) {
        const guild = SystemManager.getInstance().getGuild(msg.guild.id);

        if (process.env.PREFIX && msg.content.startsWith(process.env.PREFIX))
          prefix = process.env.PREFIX; // global prefix

        if (guild.prefix && msg.content.startsWith(guild.prefix))
          prefix = guild.prefix; // guild prefix

        if (!prefix) return;

        if (SystemManager.getInstance().ready) {
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

          await SystemManager.getInstance().commandHandler.executeMsg(msg);
        }
      } else {
        msg.channel.send('Bot still loading');
      }
    } catch (err) {
      new DreamError('Error processing the message the bot', err, {
        message: msg.content,
      }).log();
    }
  },
);

client.login(process.env.DISC_TOKEN);
