/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import Command, { CommandGroups } from '../interfaces/command';

const cmd: Command = {
  name: 'roll',
  aliases: ['rll'],
  args: true,
  cooldown: 1,
  description: 'Roll a dice',
  usage: '[D[number of faces]]',
  group: [CommandGroups.global],

  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    let return_msg = ' Rolled -> [';
    args.forEach((dice, i) => {
      if (
        dice.toLocaleLowerCase().startsWith('d') &&
        !Number.isNaN(parseInt(dice.substring(1), 10))
      ) {
        const roll = Math.floor(
          Math.random() * parseInt(dice.substring(1), 10) + 1,
        );
        return_msg = return_msg.concat(
          `(${roll})${i < args.length - 1 ? ', ' : ''} `,
        );
      } else {
        return_msg = return_msg.concat(
          `NaD${i < args.length - 1 ? ', ' : ''}  `,
        );
      }
    });
    msg.reply(`${return_msg}]`);
    return true;
  },
};

export default cmd;
