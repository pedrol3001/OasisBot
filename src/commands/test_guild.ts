/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import Command, { CommandGroups } from '../models/command';
import SystemManager from '../managers/system_manager';
import Pokemon from '../modules/pokemon/pokemon';

const cmd: Command = {
  name: 'test guild',
  aliases: ['tsgd'],
  args: false,
  cooldown: 1,
  description: 'Test Guild Command',
  usage: '[args]',
  group: [CommandGroups.guildOnly],
  roles: ['Teste'],
  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    console.log('Global');
    console.log(SystemManager.getInstance().commandHandler.commands);
    console.log('Guild');
    console.log(
      SystemManager.getInstance().getGuild(msg.guild.id).commandHandler
        .commands,
    );
    msg.channel.send('Testando Guild ;)');
    return true;
  },
};

export default cmd;
