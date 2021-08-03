import fs from 'fs';
import path from 'path';
import Discord from 'discord.js';

import DreamError from "@error/DreamError";
import { CommandError } from './error/CommandError';
import { AbstractHandler } from './handlers/AbstractHandler';
import { ArgsHandler } from './handlers/implementations/ArgsHandler';
import { RolesHandler } from './handlers/implementations/RolesHandler';
import { GroupsHandler } from './handlers/implementations/GroupsHandler';
import { CooldownsHandler } from './handlers/implementations/CooldownsHandler';
import { PermissionsHandler } from './handlers/implementations/PermissionsHandler';

import ICommand, { ICommandHandler,ICommandGroups } from "interfaces/ICommand";
import { PluginHandler } from './handlers/implementations/PluginHandler';

class CommandHandler extends AbstractHandler implements ICommandHandler{
  private _commands: Discord.Collection<string, ICommand>;

  public constructor() {
    super();
    this._commands = new Discord.Collection<string, ICommand>();

    this.add(`${path.resolve(__dirname, 'default')}`);

    this.setNext(new PluginHandler())
        .setNext(new ArgsHandler())
        .setNext(new GroupsHandler())
        .setNext(new PermissionsHandler())
        .setNext(new RolesHandler())
        .setNext(new CooldownsHandler());


  }

  public get commands(): Array<ICommand> {
    return Array.from(this._commands.values());
  }

  public async handle(msg: Discord.Message): Promise<void> {

    try {

      let prefix;

      if (msg.author.bot) return;

      if (msg.guild.prefix && msg.content.startsWith(msg.guild.prefix))
        prefix = msg.guild.prefix; // guild prefix

      if (!prefix) return;

      msg.content = msg.content.slice(prefix.length);

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

      // comand exists
      if (!msg.command) return;

      await super.handle(msg);

      await msg.command.execute(msg);
    } catch (err) {
      if(err instanceof CommandError) {
        return await err.send();
      }
      throw new DreamError('Error executting command', err, {
        message: msg,
      });
    }
  }

  public add(
    folderPath: string,
    plugin?: string,
    filter?: ICommandGroups
  ): void {
    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.ts'));

      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}/${file}`)];

        const command: ICommand = require(`${folderPath}/${file}`).default;


        if(plugin){
          command.plugin = plugin;
        }

        const command_exists = this._commands.get(command.name);
        if (command_exists) {
          throw new DreamError('Error adding commands from folder');
        } else if ( !filter || filter === command.group) {
          this._commands.set(command.name, command); // Add command to collection
        }
      }
    } catch (err) {
      throw new DreamError('Error adding commands from folder', err, {
        folder: folderPath,
        filter,
      });
    }
  }

  public remove(
    folderPath: string,
    filter?: ICommandGroups,
  ): void {
    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.ts'));


      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}/${file}`)];

        const command: ICommand = require(`${folderPath}/${file}`).default;


        if (
          filter === undefined ||
          (command.group.length > 0 && command.group === filter)
        ) {
          this._commands.delete(command.name);
        }
      }
    } catch (err) {
      throw new DreamError('Error deleting commands from folder', err, {
        folder: folderPath,
        filter,
      });
    }
  }
}
export default CommandHandler;

