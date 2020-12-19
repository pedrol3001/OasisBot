import path from 'path';
import CommandHandler from '../handlers/command_handler';
import GuildManager from '../managers/guild_manager';

abstract class Module {
  protected _guildManager: GuildManager;

  // public constructor() {}

  setModule(commandHandler: CommandHandler): void {
    commandHandler.addCommands(
      `${path.resolve(
        'src',
        'modules',
        this.constructor.name.toLowerCase(),
        'commands',
      )}\\`,
    );
  }

  rmModule(commandHandler: CommandHandler): void {
    commandHandler.rmCommands(
      `${path.resolve(
        'src',
        'modules',
        this.constructor.name.toLowerCase(),
        'commands',
      )}\\`,
    );
  }
}

export default Module;
