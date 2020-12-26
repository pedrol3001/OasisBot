/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import Command, { CommandGroups } from '../../../interfaces/command';

const cmd: Command = {
  name: 'pokemon',
  aliases: ['pkm'],
  cooldown: 1,
  args: false,
  description: 'Spawn Pokemon',
  group: [CommandGroups.guildOnly],
  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    msg.channel.send('POKEMOONNNNN');

    return true;
  },
};

export default cmd;
