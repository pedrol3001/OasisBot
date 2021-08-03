import Discord from 'discord.js';
import CommandHandler from 'command_handler/index';
import { LoadGuildsController } from "@repositories/guild/useCases/LoadGuilds/LoadGuildsController";
import {PluginsController} from './plugins'

const client = new Discord.Client({shardCount: 1});


client.commandHandler = new CommandHandler();

client.once('ready', () => {

  LoadGuildsController.handle(client);
  PluginsController.handle(client);

  client.user.setActivity("Online!");
  console.log('Ready!');
});

client.on(
  'message',
  async (msg: Discord.Message): Promise<void> => {
      await client.commandHandler.handle(msg);
  }
);

client.on("error", (e) => console.error(e));
client.on("debug", (e) => console.info(e));

export {client};
