import ICommand from 'oasis/interfaces/ICommand';
import Discord from 'discord.js';

const command: ICommand = {
  name: 'test wf',
  aliases: ['twf'],
  args: true,
  usage: 'Test',
  description: 'Test',
  group: 'global',

  async execute(msg: Discord.Message): Promise<void> {
    await msg.reply('Teste 123');
  },
};

export default command;
