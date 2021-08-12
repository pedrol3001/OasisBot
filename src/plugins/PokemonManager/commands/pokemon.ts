import ICommand from 'oasis/interfaces/ICommand';
import Discord from 'discord.js';

const command: ICommand = {
  name: 'pokemon',
  aliases: ['pkm'],
  args: false,
  description: 'Spawn a random pokemon',
  group: 'guildOnly',

  async execute(msg: Discord.Message): Promise<void> {
    await msg.reply('Teste 123');
  },
};

export default command;
