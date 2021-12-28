import { ICommand, Message } from 'discord-oasis';

const command: ICommand = {
  name: 'roll dice',
  aliases: ['roll'],
  options: [{ type: 'INTEGER', name: 'sides', description: 'The number of sides on the dice' }],
  description: 'Roll a dice of n faces',
  group: 'global',

  async execute(msg: Message): Promise<void> {
    msg.args.forEach(async (arg) => {
      await msg.reply({ content: `Rolled ${Math.floor(Math.random() * Number(arg))}` });
    });
  },
};

export default command;
