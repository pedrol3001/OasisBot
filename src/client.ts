import path from 'path';
import Discord from 'discord.js';
import { LoadGuildClientController } from "@guilds/useCases/LoadGuildClient/LoadGuildClientController";
import CommandHandler from "commandHandler";


const client = new Discord.Client();
client.commandHandler = new CommandHandler();

client.once('ready', () => {
  const loadGuildClientController = new LoadGuildClientController();
  loadGuildClientController.handle(client);
  client.commandHandler.addCommands(`${path.resolve('src', 'commandHandler', 'global')}/`);
  console.log('Ready!');
});

client.on(
  'message',
  async (msg: Discord.Message): Promise<void> => {
    await client.commandHandler.handle(msg);
  },
);

export {client};
