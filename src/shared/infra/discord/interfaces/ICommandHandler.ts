import Discord from 'discord.js'
import { IAddCommands } from "../command/providers/AddCommands/IAddCommands";
import { IRemoveCommands } from "../command/providers/RemoveCommands/IRemoveCommands";

export interface ICommandHandler{

  handle(msg: Discord.Message);
  edit (AddType: new () => IAddCommands | IRemoveCommands, ...args);

}
