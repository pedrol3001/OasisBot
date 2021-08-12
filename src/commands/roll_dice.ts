import ICommand from 'oasis/interfaces/ICommand';
import Discord from 'discord.js';

const command: ICommand = {
  name: 'roll dice',
  aliases: ['roll'],
  args: true,
  usage: '[n]',
  description: 'Roll a dice of n faces',
  group: 'global',

  async execute(msg: Discord.Message): Promise<void> {
    msg.args.forEach(async (arg) => {
      await msg.reply(`Rolled ${Math.floor(Math.random() * Number(arg))}`);
    });
  },
};

export default command;
