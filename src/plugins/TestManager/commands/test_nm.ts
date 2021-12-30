import Discord from 'discord.js';
import { ICommand } from 'discord-oasis';
import TestManager from '..';

const command: ICommand = {
  name: 'test nm',
  aliases: ['tnm'],
  options: [{ type: 'STRING', name: 'sides', description: 'The number of sides on the dice' }],
  description: {
    command: 'Test',
    subCommand: 'Test nm',
  },
  group: 'global',

  async execute(msg: Discord.Message): Promise<void> {
    const plugin_id = msg.commandHolder['pluginId'];
    if (!plugin_id) return;
    const manager = msg.manager as TestManager;
    await msg.reply({ content: `Test Manager 1: ${manager.convertText(plugin_id)}` });
  },
};

export default command;
