import Discord, { BitFieldResolvable, PermissionString } from 'discord.js';

// eslint-disable-next-line no-shadow
export enum CommandGroups {
  guildOnly,
  global,
  dmOnly,
}

export default interface Command {
  name: string;
  aliases: Array<string>;
  args?: boolean;
  cooldown?: number;
  description: string;
  usage?: string;
  roles?: Array<string>;
  group: Array<CommandGroups>;
  permissions?: Array<BitFieldResolvable<PermissionString>>;

  execute(msg: Discord.Message, args: Array<string>): Promise<boolean>;
}
