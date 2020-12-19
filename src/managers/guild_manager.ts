import Discord from 'discord.js';
import path from 'path';
import CommandHandler from '../handlers/command_handler';
import Module from '../modules/module';
import Music from '../modules/music/music';
import Pokemon from '../modules/pokemon/pokemon';
import SystemManager from './system_manager';
import { CommandGroups } from '../models/command';

class GuildManager {
  private _guild: Discord.Guild;

  private _prefix: string;

  private _guildCommandHandler: CommandHandler;

  private _modules: Discord.Collection<string, Module>;

  public constructor(guild: Discord.Guild) {
    this._guild = guild;
    this._guildCommandHandler = new CommandHandler();
    this._modules = new Discord.Collection<string, Module>();
    this._guildCommandHandler.addCommands(
      `${path.resolve('src', 'commands')}\\`,
      CommandGroups.guildOnly,
    );
  }

  public async setPrefixFromDb(count = 0): Promise<void> {
    try {
      const quarry = await SystemManager.getInstance().guildDb.findOne(
        this._guild.id,
      );
      this._prefix = quarry ? quarry.prefix : null;
    } catch (err) {
      if (count < 5) {
        console.warn(`Erros setting prefix, try:${count}`);
        // eslint-disable-next-line no-param-reassign
        this.setPrefixFromDb((count += 1));
      } else console.error(err);
    }
  }

  public setAllModules(): void {
    new Pokemon().setModule(this.commandHandler);
    console.log(' - Pokemon');
    new Music().setModule(this.commandHandler);
    console.log(' - Music');
  }

  public set prefix(prefix: string) {
    this._prefix = prefix;
  }

  public get prefix(): string {
    return this._prefix;
  }

  public get guild(): Discord.Guild {
    return this._guild;
  }

  public get modules(): Discord.Collection<string, Module> {
    return this._modules;
  }

  public get commandHandler(): CommandHandler {
    return this._guildCommandHandler;
  }
}

export default GuildManager;
