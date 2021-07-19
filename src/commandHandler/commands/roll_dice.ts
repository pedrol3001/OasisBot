import ICommand from "commandHandler/interfaces/ICommand";
import Discord, { BitFieldResolvable, PermissionString } from 'discord.js';

const command: ICommand = {
  name: 'roll dice',
  aliases: ['roll'],
  args: true,
  usage: 'Digite roll e o numero de lados do dado',
  description: 'Roll a dice of n numbers',
  group: "global",

  async execute(msg: Discord.Message): Promise<void> {
    msg.args.forEach((arg) => {
      msg.reply(`Toma ${Math.floor(Math.random() * Number(arg))}`);
    });
  }
};

export default command;
