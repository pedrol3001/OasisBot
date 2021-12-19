import Discord from 'discord.js';
import { ICommand } from 'discord-oasis';
import WerewolfManager from '..';

const command: ICommand = {
  name: 'test wf',
  aliases: ['twf'],
  args: true,
  usage: 'Test',
  description: 'Test',
  group: 'global',

  async execute(msg: Discord.Message): Promise<void> {
    const plugin_id = msg.command?.plugin_id;
    if (!plugin_id) return;
    const manager = msg.manager as WerewolfManager;
    await msg.reply(`Test Werewolf: ${manager.convertText(plugin_id)}`);
  },
};

export default command;
