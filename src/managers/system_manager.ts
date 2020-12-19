import Discord from 'discord.js';
import path from 'path';
import { getRepository, Repository } from 'typeorm';
import GuildManager from './guild_manager';
import CommandHandler from '../handlers/command_handler';
import Guild from '../database/models/Guild';
import EmojiHandler from '../handlers/emoji_handler';
import { CommandGroups } from '../models/command';

class SystemManager {
  private _ready: boolean;

  private static instance: SystemManager;

  private _client: Discord.Client;

  private guilds: Map<Discord.Snowflake, GuildManager>;

  private _dmCommandHandler: CommandHandler;

  private _emojiHandler: EmojiHandler;

  private _guildDb: Repository<Guild>;

  private constructor(client: Discord.Client) {
    try {
      this._ready = false;
      this._guildDb = getRepository(Guild);
      this._client = client;
      this.guilds = new Map<Discord.Snowflake, GuildManager>();

      this._dmCommandHandler = new CommandHandler();
      this._emojiHandler = new EmojiHandler(
        this._client.guilds.cache.get(process.env.CACHE_GUILD).emojis,
      );
      this._dmCommandHandler.addCommands(
        `${path.resolve('src', 'commands')}\\`,
        CommandGroups.global,
      );
    } catch (err) {
      console.error(err);
    }
  }

  public static async init(client: Discord.Client): Promise<void> {
    if (!SystemManager.instance) {
      SystemManager.instance = new SystemManager(client);
      await SystemManager.instance.setGuildsFromCache();
      SystemManager.instance._ready = true;
    } else {
      throw Error(`System Manager Already Inited`);
    }
  }

  public static async reset(): Promise<void> {
    if (!SystemManager.instance) {
      throw Error(`System Manager Not Inited, run the init method first`);
    } else {
      SystemManager.instance = new SystemManager(
        SystemManager.instance._client,
      );
      await SystemManager.instance.setGuildsFromCache();
      SystemManager.instance._ready = true;
    }
  }

  public static getInstance(): SystemManager {
    if (!SystemManager.instance) {
      throw Error(`System Manager Not Inited, run the init method first`);
    }
    return SystemManager.instance;
  }

  public async setGuildsFromCache(): Promise<void[]> {
    try {
      const promises: Array<Promise<void>> = [];
      this._client.guilds.cache.forEach(guild => {
        const guild_aux = new GuildManager(guild);

        promises.push(
          guild_aux.setPrefixFromDb().then(() => {
            this.guilds.set(guild.id, guild_aux);
            console.log(`${guild.name} OK!`);

            // SOMENTE PARA TESTEESS
            if (
              process.env.NODE_ENV !== 'production' &&
              guild_aux.guild.id === process.env.CACHE_GUILD
            ) {
              guild_aux.setAllModules();
            }
          }),
        );
      });

      return Promise.all(promises);
    } catch (err) {
      console.error(err);
      return Promise.reject();
    }
  }

  public addGuild(guild: Discord.Guild): void {
    this.guilds.set(guild.id, new GuildManager(guild));
  }

  public getGuild(guildId: Discord.Snowflake): GuildManager {
    return this.guilds.get(guildId);
  }

  public rmGuild(guildId: Discord.Snowflake): boolean {
    return this.guilds.delete(guildId);
  }

  public get guildDb(): Repository<Guild> {
    return this._guildDb;
  }

  public get commandHandler(): CommandHandler {
    return this._dmCommandHandler;
  }

  public get emojiHandler(): EmojiHandler {
    return this._emojiHandler;
  }

  public get client(): Discord.Client {
    return this._client;
  }

  public get ready(): boolean {
    return this._ready;
  }
}

export default SystemManager;
