import { ICommand, Message } from 'discord-oasis';

const command: ICommand = {
  name: 'roll dice',
  aliases: ['roll'],
  args: true,
  usage: '[n]',
  description: 'Roll a dice of n faces',
  group: 'global',

  async execute(msg: Message): Promise<void> {
    msg.args.forEach(async (arg) => {
      await msg.reply(`Rolled ${Math.floor(Math.random() * Number(arg))}`);
    });
  },
};

export default command;
