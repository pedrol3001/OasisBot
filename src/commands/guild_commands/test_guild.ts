/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import Command from '../command';

const cmd: Command = {
  name: 'test guild',
  aliases: ['tsgd'],
  args: false,
  cooldown: 1,
  description: 'Test Guild Command',
  usage: '[args]',
  roles: ['Teste'],
  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    msg.channel.send('Testando Guild ;)');
    return true;
  },
};

export default cmd;
