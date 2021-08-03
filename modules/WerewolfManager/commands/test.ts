import ICommand from "interfaces/ICommand";
import Discord from 'discord.js';

const command: ICommand = {
  name: 'test',
  aliases: ['t'],
  args: true,
  usage: 'Test',
  description: 'Test',
  group: "global",

  async execute(msg: Discord.Message): Promise<void> {
    await msg.reply("Teste 123");
  }
};

export default command;
