import Discord from 'discord.js';
import CommandHandler from '@command/index';
import { LoadGuildsController } from "@repositories/guild/useCases/LoadGuilds/LoadGuildsController";
import {PluginsController} from './plugins'
import DreamError from '@error/DreamError';
import { CreateGuildController } from '@repositories/guild/useCases/CreateGuild/CreateGuildController';
import { ICreateGuildDTO } from '@repositories/guild/dtos/ICreateGuildDTO';

const client = new Discord.Client({shardCount: parseInt(process.env.SHARD_COUNT,10)});


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

client.on('guildCreate',
  async (guild: Discord.Guild): Promise<void> => {
    CreateGuildController.handle({id: guild.id} as ICreateGuildDTO);
    guild.systemChannel.send("Welcome to DreamsBot!");
  }
);

client.on("error", (err) => {
  if (err instanceof DreamError)
    err.log();
  else
    console.error(err)
});
client.on("debug", (db) => console.info(db));

export {client};
