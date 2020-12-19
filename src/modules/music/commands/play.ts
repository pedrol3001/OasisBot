/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import Command, { CommandGroups } from '../../../models/command';

const cmd: Command = {
  name: 'play',
  aliases: ['p'],
  cooldown: 1,
  description: 'Play music',
  usage: '[name | youtube url | spotify url]',
  group: [CommandGroups.guildOnly],
  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    msg.channel.send('PLAYYYY');

    return true;
  },
};

export default cmd;
