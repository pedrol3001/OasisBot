import Discord, { BitFieldResolvable, PermissionString } from 'discord.js';

export type ICommandGroups = "guildOnly" | "global" | "dmOnly";

export default interface ICommand {
  name: string;
  aliases: Array<string>;
  args?: boolean;
  cooldown?: number;
  description: string;
  usage?: string;
  roles?: Array<string>;
  group: ICommandGroups;
  permissions?: Array<BitFieldResolvable<PermissionString>>;

  plugin?: string;

  execute(msg: Discord.Message): Promise<void>;
}

export interface ICommandHandler{

  handle(msg: Discord.Message);
  add(folderPath: string,plugin?: string ,filter?: ICommandGroups);
  remove(folderPath: string, filter?: ICommandGroups);

}
