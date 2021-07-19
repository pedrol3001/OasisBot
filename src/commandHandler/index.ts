import Discord from 'discord.js';
import fs from 'fs';

import ICommand from "commandHandler/interfaces/ICommand";

import DreamError from "@error/DreamError";
import { CommandError } from './error/CommandError';
import { ArgsHandler } from './handlers/ArgsHandler';
import { CooldownsHandler } from './handlers/CooldownsHandler';
import { GroupsHandler } from './handlers/GroupsHandler';
import { PermissionsHandler } from './handlers/PermissionsHandler';
import { RolesHandler } from './handlers/RolesHandler';
import { container } from 'tsyringe';
import  IHandler  from './interfaces/IHandler';
import command from './commands/roll_dice';


class CommandHandler {
  private _commands: Discord.Collection<string, ICommand>;
  private _handlers: Array<IHandler>;

  public constructor() {
    this._commands = new Discord.Collection<string, ICommand>();
    this._handlers = [
      container.resolve(ArgsHandler),
      container.resolve(GroupsHandler),
      container.resolve(PermissionsHandler),
      container.resolve(RolesHandler),
      container.resolve(CooldownsHandler)
    ];

  }

  public get commands(): Array<ICommand> {
    return Array.from(this._commands.values());
  }

  public async handle(msg: Discord.Message, count = 0): Promise<void> {
    try {

      let prefix;
      let command: ICommand

      if (msg.author.bot) return;

      if (msg.guild.prefix && msg.content.startsWith(msg.guild.prefix))
        prefix = msg.guild.prefix; // guild prefix

      if (!prefix) return;

      msg.content = msg.content.slice(prefix.length);

      msg.args = msg.content.trim().split(/\s+/);
      const command_msg = new Array<string>();

      // composed commands names
      while (!command && msg.args.length > 0) {

        command_msg.push(msg.args.shift().toLowerCase());

        command = this._commands.get(command_msg.join(' ')) ||
                  this._commands.find((cmd: ICommand) =>{
                    return  cmd.aliases?.includes(command_msg.join(' ')) && !cmd.name.includes(command_msg.join(' '))
                  }
                  );
      }

      // comand exists
      if (!command) return;

      this._handlers.forEach((handler: IHandler) => {
        handler.handle(msg, command);
      });

      await command.execute(msg);
    } catch (err) {
      if (count >= 5) {
        if(err instanceof CommandError) {
          err.channel.send(err.message);
        }else{
          new DreamError('Error executting command', err, {
            message: msg,
            command: command,
          }).log();
        }
      }else{
        console.warn(`Erros loading commands, try:${count}`);
        this.handle(msg, (count += 1));
      }
    }
  }

  public add(
    folderPath: string,
    filter?: "guildOnly" | "global" | "dmOnly",
    count = 0,
  ): void {
    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.ts'));

      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}${file}`)];

        const command: ICommand = require(`${folderPath}${file}`).default;

        const command_exists = this._commands.get(command.name);
        if (command_exists) {
          new DreamError('Error adding commands from folder').log();
        } else if ( !filter || filter === command.group) {
          this._commands.set(command.name, command); // Add command to collection
        }
      }
    } catch (err) {
      if (count >= 5) {
        new DreamError('Error adding commands from folder', err, {
          folder: folderPath,
          filter,
        }).log();
      } else {
        console.warn(`Erros loading commands, try:${count}`);
        this.add(folderPath, filter, (count += 1));
      }
    }
  }

  public remove(
    folderPath: string,
    filter?: "guildOnly" | "global" | "dmOnly",
    count = 0,
  ): void {
    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.ts'));


      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}${file}`)];

        const command: ICommand = require(`${folderPath}${file}`).default;


        if (
          filter === undefined ||
          (command.group.length > 0 && command.group === filter)
        ) {
          this._commands.delete(command.name);
        }
      }
    } catch (err) {
      if (count >= 5) {
        new DreamError('Error deleting commands from folder', err, {
          folder: folderPath,
          filter,
        }).log();
      } else {
        console.warn(`Erros removing commands, try:${count}`);
        this.remove(folderPath, filter, (count += 1));
      }
    }
  }
}

export default CommandHandler;
