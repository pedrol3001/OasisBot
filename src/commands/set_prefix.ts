import { SetGuildPrefixController } from '@repositories/guild/useCases/SetGuildPrefix/SetGuildPrefixController';
import ICommand from '@discord/interfaces/ICommand';
import Discord from 'discord.js';

const cmd: ICommand = {
  name: 'set prefix',
  aliases: ['spfx'],
  args: true,
  cooldown: 5,
  description: 'Set guild prefix',
  usage: '[preifx]',
  group: 'guildOnly',

  async execute(msg: Discord.Message): Promise<void> {

    const prefix = msg.args[0];
    await SetGuildPrefixController.handle(msg.guild.id, prefix);
    msg.guild.prefix = prefix;
    await msg.channel.send(`Prefix for ${msg.guild.name} has been set to ${prefix}`);

  }
};

export default cmd;
