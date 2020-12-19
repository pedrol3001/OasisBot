/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import SystemManager from '../managers/system_manager';
import Command, { CommandGroups } from '../models/command';

const cmd: Command = {
  name: 'emojji',
  aliases: ['emj'],
  args: true,
  cooldown: 1,
  description: 'Send Emoji',
  usage: '[image link]',
  group: [CommandGroups.global],

  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    try {
      const emjHandler = SystemManager.getInstance().emojiHandler;
      await emjHandler.addEmoji('emj1', args[0]);
      await msg.channel.send(`<:emj1:${emjHandler.getEmoji('emj1')}>`);
      await emjHandler.rmEmoji('emj1');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

export default cmd;
