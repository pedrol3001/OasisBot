/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import SystemManager from '../managers/system_manager';
import Command, { CommandGroups } from '../interfaces/command';
import DreamError from '../handlers/error_handler';

const cmd: Command = {
  name: 'set prefix',
  aliases: ['spfx'],
  args: true,
  cooldown: 5,
  description: 'Set guild prefix',
  usage: '[preifx]',
  group: [CommandGroups.guildOnly],

  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    const db = SystemManager.getInstance().guildDb;

    const entity = db.create({
      guild_id: msg.guild.id,
      prefix: args[0],
    });

    await db
      .save(entity)
      .then(() => {
        msg.channel.send(`Prefix set to ${args[0]}`);
        // SystemManager.getInstance().getGuild(msg.guild.id).prefix = args[0];

        SystemManager.getInstance().getGuild(
          msg.guild.id,
        ).prefix = args[0].toString();
      })
      .catch(err => {
        new DreamError('Error saving prefix in database', err).log();
      });
    return true;
  },
};

export default cmd;
