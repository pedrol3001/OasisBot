import path from 'path';
import Discord from 'discord.js';
import { LoadGuildController } from "@guilds/useCases/LoadGuild/LoadGuildController";
import CommandHandler from "commandHandler";


const client = new Discord.Client();
client.commandHandler = new CommandHandler();

client.once('ready', () => {
  const loadGuildController = new LoadGuildController();
  loadGuildController.handle(client);

  client.commandHandler.add(`${path.resolve('src', 'commandHandler', 'commands')}/`);
  console.log('Ready!');
});

client.on(
  'message',
  async (msg: Discord.Message): Promise<void> => {
    await client.commandHandler.handle(msg);
  },
);

export {client};
