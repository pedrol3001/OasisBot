import * as dotenv from 'dotenv';
import Discord from 'discord.js';
import DreamError from '@error/DreamError';
import CommandHandler from './commands';
import path from 'path';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const client = new Discord.Client();
const commandHandler = new CommandHandler();

client.once('ready', () => {
  console.log('Ready!');
  commandHandler.addCommands(`${path.resolve('src', 'commands', 'global')}/`, 'global');
});


client.on(
  'message',
  async (msg: Discord.Message): Promise<void> => {
    commandHandler.executeMsg(msg);
  },
);

client.login(process.env.DISC_TOKEN);
