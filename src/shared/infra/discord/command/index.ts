import path from 'path';
import Discord from 'discord.js';

import DreamError from "@error/DreamError";
import { root_dir } from '@config/enviroment';
import { CommandError } from './error/CommandError';
import { AbstractHandler } from './handlers/AbstractHandler';
import { ICommandHandler } from '../interfaces/ICommandHandler';
import { ArgsHandler } from './handlers/implementations/ArgsHandler';
import { RolesHandler } from './handlers/implementations/RolesHandler';
import { PluginsHandler } from './handlers/implementations/PluginsHandler';
import { GroupsHandler } from './handlers/implementations/GroupsHandler';
import { CooldownsHandler } from './handlers/implementations/CooldownsHandler';
import { PermissionsHandler } from './handlers/implementations/PermissionsHandler';
import { IAddCommands } from './providers/AddCommands/IAddCommands';
import { IRemoveCommands } from './providers/RemoveCommands/IRemoveCommands';
import { AddCommandsFromFolder } from './providers/AddCommands/implementations/AddCommandsFromFolder';
import ICommand from "@discord/interfaces/ICommand";

const setupPrefix = process.env.NODE_ENV === "production" ? undefined : "***";

class CommandHandler extends AbstractHandler implements ICommandHandler{

  private _commands: Discord.Collection<string, ICommand> =  new Discord.Collection<string, ICommand>();

  public get commands(): Array<ICommand> {
    return Array.from(this._commands.values());
  }

  public constructor() {
    super();

    const folder = `${path.resolve(root_dir, "commands")}`;
    this.edit(AddCommandsFromFolder, folder);

    this.setNext(new PluginsHandler())
        .setNext(new ArgsHandler())
        .setNext(new GroupsHandler())
        .setNext(new PermissionsHandler())
        .setNext(new RolesHandler())
        .setNext(new CooldownsHandler());
  }

  public edit (ConfType: new () => IAddCommands | IRemoveCommands, ...args){
    const provider = new ConfType();
    provider.handle(this._commands,args);
  }

  public async handle(msg: Discord.Message): Promise<void> {

    try {

      if (msg.author.bot) return;

      if (msg.guild.prefix && msg.content.startsWith(msg.guild.prefix)){
        msg.prefix = msg.guild.prefix; // guild prefix
      }else if(setupPrefix && msg.content.startsWith(setupPrefix)){
        msg.prefix = setupPrefix;
      }

      if (!msg.prefix) return;



      msg.content = msg.content.slice(msg.prefix.length);

      msg.args = msg.content.trim().split(/\s+/);
      const command_msg = new Array<string>();

      // composed commands names
      while (!msg.command && msg.args.length > 0) {

      command_msg.push(msg.args.shift().toLowerCase());

      msg.command = this._commands.get(command_msg.join(' ')) ||
                  this._commands.find((cmd: ICommand) =>{
                  return  cmd.aliases?.includes(command_msg.join(' '))
                  });
      }



      if (!msg.command) return;



      await super.handle(msg);
      await msg.command.execute(msg);
    } catch (err) {
      if(err instanceof CommandError) {
        if(err.message && err.channel)
        return await err.send();
      }
      throw new DreamError('Error executting command', err, {
        message: msg,
      });
    }
  }
}
export default CommandHandler;

