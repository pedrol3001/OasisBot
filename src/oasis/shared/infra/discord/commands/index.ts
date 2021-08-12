import Discord, { Message } from 'discord.js';

import ICommand from 'oasis/interfaces/ICommand';
import OasisError from '@error/OasisError';

import { CommandError } from './error/CommandError';
import { ICommandHandler } from '@interfaces/ICommandHandler';
import { IAddCommands } from './providers/AddCommands/IAddCommands';
import { IRemoveCommands } from './providers/RemoveCommands/IRemoveCommands';
import { AddCommandsFromFolder } from './providers/AddCommands/implementations/AddCommandsFromFolder';
import { IMicroHandler } from './handlers/IMicroHandler';
import { ArgsMicroHandler } from './handlers/implementations/ArgsMicroHandler';
import { GroupsMicroHandler } from './handlers/implementations/GroupsMicroHandler';
import { PermissionsMicroHandler } from './handlers/implementations/PermissionsMicroHandler';
import { RolesMicroHandler } from './handlers/implementations/RolesMicroHandler';
import { CooldownsMicroHandler } from './handlers/implementations/CooldownsMicroHandler';
import { PluginsMicroHandler } from './handlers/implementations/PluginsMicroHandler';

const setupPrefix = process.env.NODE_ENV === 'production' ? undefined : '***';

class CommandHandler implements ICommandHandler {
  private _commands: Discord.Collection<string, ICommand> = new Discord.Collection<string, ICommand>();

  private _micro_handlers: IMicroHandler[];

  public get commands(): Array<ICommand> {
    return Array.from(this._commands.values());
  }

  public constructor(commands_folder: string) {
    this.edit(AddCommandsFromFolder, commands_folder);

    this._micro_handlers = [
      new ArgsMicroHandler(),
      new GroupsMicroHandler(),
      new PermissionsMicroHandler(),
      new RolesMicroHandler(),
      new CooldownsMicroHandler(),
    ];
  }

  public edit(ConfType: new () => IAddCommands | IRemoveCommands, ...args) {
    const provider = new ConfType();
    provider.handle(this._commands, args);
  }

  public async handle(msg: Message): Promise<void> {
    try {
      if (msg.author.bot) return;

      if (msg.guild.prefix && msg.content.startsWith(msg.guild.prefix)) {
        msg.prefix = msg.guild.prefix; // guild prefix
      } else if (setupPrefix && msg.content.startsWith(setupPrefix)) {
        msg.prefix = setupPrefix;
      }

      if (!msg.prefix) return;

      msg.content = msg.content.slice(msg.prefix.length);

      msg.args = msg.content.trim().split(/\s+/);
      const command_msg = new Array<string>();

      // composed commands names
      while (!msg.command && msg.args.length > 0) {
        command_msg.push(msg.args.shift().toLowerCase());

        msg.command =
          this._commands.get(command_msg.join(' ')) ||
          this._commands.find((cmd: ICommand) => {
            return cmd.aliases?.includes(command_msg.join(' '));
          });
      }

      if (!msg.command) return;

      await new PluginsMicroHandler().handle(msg);

      await Promise.all(
        this._micro_handlers.map(async (handler) => {
          await handler.handle(msg);
        }),
      );

      await msg.command.execute(msg);
    } catch (err) {
      if (err instanceof CommandError) {
        if (err.message && err.channel) return await err.send();
      }
      throw new OasisError('Error executting command', err, {
        message: msg,
      });
    }
  }
}
export default CommandHandler;
