import Discord, { DiscordAPIError, Snowflake } from 'discord.js';
import GuildManager from './guild_manager';
import CommandHandler from '../handlers/command_handler';
import { getRepository, Repository } from 'typeorm';
import Guild from '../models/Guild';
import path from 'path';

class SystemManager {
  private static instance: SystemManager;
  private client: Discord.Client;
  private guilds: Map<Discord.Snowflake, GuildManager>;
  private _dmCommandHandler: CommandHandler;

  private _guildDb: Repository<Guild>;

  private constructor(client: Discord.Client) {
    try {
      this._guildDb = getRepository(Guild);
      this.client = client;
      this.guilds = new Map<Discord.Snowflake, GuildManager>();

      this._dmCommandHandler = new CommandHandler();
      this._dmCommandHandler.addCommands(path.resolve("src", "global_commands") + "\\");


    } catch (err) {
      console.error(err);
    }
  }

  public static init(client: Discord.Client): SystemManager {
    if (!SystemManager.instance) {
      SystemManager.instance = new SystemManager(client);
    }
    return SystemManager.instance;
  }
  public static getInstance(): SystemManager {
    if (!SystemManager.instance) {
      throw Error(`System Manager Not Inited, run the init method first`);
    }
    return SystemManager.instance;
  }
  public async setGuildsFromCache() {
    for (let [id, guild] of this.client.guilds.cache) {
      this.guilds.set(guild.id, new GuildManager(guild.id));
      await this.guilds.get(guild.id).setPrefixFromDb();
      console.log(`${guild.name} OK!`);
    }

  }

  public addGuild(guildId: Snowflake) {
    this.guilds.set(guildId, new GuildManager(guildId));
  }

  public getGuild(guildId: Snowflake): GuildManager {
    return this.guilds.get(guildId);
  }

  public rmGuild(guildId: Snowflake): Boolean {
    return this.guilds.delete(guildId);
  }

  public get guildDb(): Repository<Guild> {
    return this._guildDb;
  }

  public get commandHandler(): CommandHandler {
    return this._dmCommandHandler;
  }

}

export default SystemManager;
