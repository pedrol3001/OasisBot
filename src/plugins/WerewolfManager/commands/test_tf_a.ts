import Discord from 'discord.js';
import { ICommand } from 'discord-oasis';
import WerewolfManager from '..';

const command: ICommand = {
  name: 'test tf a',
  aliases: ['ttfa'],
  options: [{ type: 'STRING', name: 'sides', description: 'The number of sides on the dice' }],
  description: 'Test tf a',
  group: 'global',

  async execute(msg: Discord.Message): Promise<void> {
    const plugin_id = msg.commandHolder['pluginId'];
    if (!plugin_id) return;
    const manager = msg.manager as WerewolfManager;
    await msg.reply({ content: `Test Werewolf 2 A: ${manager.convertText(plugin_id)}` });
  },
};

export default command;
