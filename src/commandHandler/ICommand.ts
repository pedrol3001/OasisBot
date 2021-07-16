import Discord, { BitFieldResolvable, PermissionString } from 'discord.js';

export default interface ICommand {
  name: string;
  aliases: Array<string>;
  args?: boolean;
  cooldown?: number;
  description: string;
  usage?: string;
  roles?: Array<string>;
  group: Array<"guildOnly" | "global" | "dmOnly">;
  permissions?: Array<BitFieldResolvable<PermissionString>>;

  execute(msg: Discord.Message): Promise<void>;
}
