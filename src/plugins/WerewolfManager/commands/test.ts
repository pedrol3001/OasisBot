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
    const text = msg.command.plugin_id;
    const manager = msg.manager as WerewolfManager;
    await msg.reply(`Teste Werewolf: ${manager.convertText(text)}`);
  },
};

export default command;
