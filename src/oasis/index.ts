import '@repositories/index';

import { ConnectDb } from '@database/typeorm';
import CommandHandler from '@discord/commands';
import PluginsHandler from '@discord/plugins';
import oasisError from '@error/OasisError';
import { ICreateGuildDTO } from '@repositories/guild/dtos/ICreateGuildDTO';
import { CreateGuildController } from '@repositories/guild/useCases/CreateGuild/CreateGuildController';
import { LoadGuildsController } from '@repositories/guild/useCases/LoadGuilds/LoadGuildsController';
import { Client, Guild, Message } from 'discord.js';
import { IOasisOptions } from './interfaces/IOasisOptions';
import { ICommandHandler } from '@interfaces/ICommandHandler';
import { IPluginsHanlder } from '@interfaces/IPluginsHandler';

class Oasis {
  readonly client: Client;
  readonly command_handler: ICommandHandler;
  readonly plugins_handler: IPluginsHanlder;

  constructor(options: IOasisOptions) {
    const { plugins, commands_folder, shard_count } = options;

    this.client = new Client({ shardCount: shard_count });
    this.command_handler = new CommandHandler(commands_folder);
    this.plugins_handler = new PluginsHandler(plugins);

    this.setDefaultCallbacks();
  }

  private setDefaultCallbacks(): void {
    const PluginsHandler = this.plugins_handler;
    const CommandHandler = this.command_handler;
    const client = this.client;

    client.once('ready', () => {
      LoadGuildsController.handle(client);
      PluginsHandler.setup(this.command_handler);

      client.user.setActivity('Online!');
      console.log('Ready!');
    });

    client.on('message', async (msg: Message): Promise<void> => {
      msg.temp = PluginsHandler.plugins;
      await this.command_handler.handle(msg);
    });

    client.on('guildCreate', async (guild: Guild): Promise<void> => {
      CreateGuildController.handle({ id: guild.id } as ICreateGuildDTO);
      console.log(`Joinned guild ${guild.name}`);
      guild.systemChannel.send('Welcome to oasisBot!');
    });

    client.on('error', (err) => {
      if (err instanceof oasisError) err.log();
      else console.error(err);
    });

    client.on('debug', (db) => console.info(db));
  }

  public listen(token: string) {
    ConnectDb()
      .then((connection) => {
        console.log('Connected to database: ', connection.isConnected);
        this.client.login(token);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export { Oasis };
