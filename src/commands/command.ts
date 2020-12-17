import Discord, { BitFieldResolvable, PermissionString } from 'discord.js';

export default interface Command {
  name: string;
  aliases: Array<string>;
  args?: boolean;
  dmOnly?: boolean;
  cooldown?: number;
  description: string;
  usage?: string;
  roles?: Array<string>;
  permissions?: Array<BitFieldResolvable<PermissionString>>;

  execute(msg: Discord.Message, args: Array<string>): Promise<boolean>;
}
