import ICommand from "@commands/ICommand";
import Discord, { BitFieldResolvable, PermissionString } from 'discord.js';

const command: ICommand = {
  name: 'rollDice',
  aliases: ['roll'],
  args: true,
  usage: 'digite roll e o numero de lados do dado',
  description: 'Roll a dice of n numbers',
  group: ["global"],

  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    args.forEach((arg) => {
      msg.reply(`Toma ${Math.floor(Math.random() * Number(arg))}`);
    });
    return true;
  }
};

export default command;
