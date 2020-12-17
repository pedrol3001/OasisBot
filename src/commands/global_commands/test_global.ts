/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import Command from '../command';

const cmd: Command = {
  name: 'test global',
  aliases: ['tsgl'],
  args: false,
  cooldown: 1,
  description: 'Test Global Command',
  usage: '[args]',
  roles: ['Teste'],

  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    msg.channel.send('Testado Global ;)');
    return true;
  },
};

export default cmd;
