/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import SystemManager from '../../managers/system_manager';
import Command from '../command';

const cmd: Command = {
  name: 'reload',
  aliases: ['rld'],
  args: false,
  cooldown: 5,
  description: 'Reload bot',
  permissions: ['ADMINISTRATOR'],

  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    try {
      await SystemManager.reset();
      // msg.reply(`Bot reloaded`);
      console.log(`Reloaded as ${SystemManager.getInstance().client.user.tag}`);
      return true;
    } catch (err) {
      msg.reply(`Error reseting bot`);
      console.error(err);
      return false;
    }
  },
};

export default cmd;
