import Discord from 'discord.js';
import CommandHandler from './command_handler';
import SystemManager from './system_manager';
import path from 'path';
class GuildManager {
  private guildId: Discord.Snowflake;
  private _prefix: string;
  private _commandHandler: CommandHandler;

  public constructor(guildId: Discord.Snowflake) {
    this.guildId = guildId;
    this._commandHandler = new CommandHandler();
    this._commandHandler.addCommands(path.resolve("src", "guild_commands") + "\\");

  }

  public async setPrefixFromDb() {
    try {
      const quarry = await SystemManager.getInstance().serverDb.findOne(this.guildId);
      this.prefix = quarry ? quarry.prefix : null;
    } catch (err) {
      console.error(err);
    }
  }

  public set prefix(prefix: string) {
    this._prefix = prefix;
  }

  public get prefix(): string {
    return this._prefix;
  }

  public get commandHandler(): CommandHandler {
    return this._commandHandler;
  }
}

export default GuildManager;
