import Discord from 'discord.js';
import { ICommand } from 'discord-oasis';
import TestManager from '..';

const command: ICommand = {
  name: 'test mn b',
  aliases: ['tmnb'],
  options: [{ type: 'STRING', name: 'sides', description: 'The number of sides on the dice', required: true }],
  description: 'Test mn b',
  group: 'global',

  async execute(msg: Discord.Message): Promise<void> {
    const plugin_id = msg.commandHolder['pluginId'];
    if (!plugin_id) return;
    const manager = msg.manager as TestManager;
    await msg.reply({ content: `Test Manager 2 B: ${manager.convertText(plugin_id)}` });
  },
};

export default command;
