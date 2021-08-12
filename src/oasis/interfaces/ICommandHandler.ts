import Discord from 'discord.js';
import { IAddCommands } from '../shared/infra/discord/commands/providers/AddCommands/IAddCommands';
import { IRemoveCommands } from '../shared/infra/discord/commands/providers/RemoveCommands/IRemoveCommands';

export interface ICommandHandler {
  handle(msg: Discord.Message);
  edit(AddType: new () => IAddCommands | IRemoveCommands, ...args);
}
