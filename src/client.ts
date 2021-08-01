import Discord from 'discord.js';
import DreamError from '@error/DreamError';
import CommandHandler from 'commands/index';
import { LoadGuildController } from "@guilds/useCases/LoadGuild/LoadGuildController";


const client = new Discord.Client();
client.commandHandler = new CommandHandler();

client.once('ready', () => {
  const loadGuildController = new LoadGuildController();
  loadGuildController.handle(client);

  console.log('Ready!');
});

client.on(
  'message',
  async (msg: Discord.Message): Promise<void> => {
    try{
      await client.commandHandler.handle(msg);
    } catch(err){
      err.log()
    }
  },
);

export {client};
