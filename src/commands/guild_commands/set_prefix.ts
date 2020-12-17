/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import SystemManager from '../../managers/system_manager';
import Command from '../command';

const cmd: Command = {
  name: 'set prefix',
  aliases: ['spfx'],
  args: true,
  cooldown: 5,
  description: 'Set guild prefix',
  usage: '[preifx]',

  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    const db = SystemManager.getInstance().guildDb;

    const entity = db.create({
      guild_id: msg.guild.id,
      prefix: args[0],
    });

    await db.save(entity).then(() => {
      msg.channel.send(`Prefix set to ${args[0]}`);
      // SystemManager.getInstance().getGuild(msg.guild.id).prefix = args[0];

      SystemManager.getInstance().getGuild(
        msg.guild.id,
      ).prefix = args[0].toString();
    });
    return true;
  },
};

export default cmd;
