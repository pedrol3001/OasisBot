import DreamError from '@error/DreamError';
import { SetGuildPrefixController } from '@guilds/useCases/SetGuildPrefix/SetGuildPrefixController';
import ICommand from 'commandHandler/ICommand';
import Discord from 'discord.js';

const cmd: ICommand = {
  name: 'set prefix',
  aliases: ['spfx'],
  args: true,
  cooldown: 5,
  description: 'Set guild prefix',
  usage: '[preifx]',
  group: ['guildOnly'],

  async execute(msg: Discord.Message): Promise<void> {

    try{
      const setGuildPrefixController = new SetGuildPrefixController();
      const prefix = msg.args[0];
      await setGuildPrefixController.handle(msg.guild.id, prefix);
      msg.guild.prefix = prefix;
      await msg.channel.send(`Prefix for ${msg.guild.name} has been set to ${prefix}`);

    } catch(err) {
      new DreamError('Error saving prefix in database', err).log();
    }
  }
};

export default cmd;
