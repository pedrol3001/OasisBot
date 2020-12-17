/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord, { MessageEmbed } from 'discord.js';
import GuildManager from '../../managers/guild_manager';
import SystemManager from '../../managers/system_manager';
import Command from '../command';

const cmd: Command = {
  name: 'help',
  aliases: ['h'],
  description: 'List all of my commands or info about a specific command.',
  usage: '[command name]',
  dmOnly: false,

  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    let guild: GuildManager;
    let commands_list = SystemManager.getInstance().commandHandler.commands;
    if (msg.guild) {
      guild = SystemManager.getInstance().getGuild(msg.guild.id);
      commands_list = commands_list.concat(guild.commandHandler.commands);
    }

    const mensage_block = new MessageEmbed()
      .setTitle('All Comands')
      .setColor('#ffa500');

    const data = new Array<string>();

    commands_list.forEach(command => {
      data.push(
        `**${guild && guild.prefix ? guild.prefix : process.env.PREFIX}${
          command.name
        } ${command.usage}**:  ${command.description}`,
      );
    });

    mensage_block.setDescription(data);

    msg.channel.send(mensage_block);

    return true;
  },
};

export default cmd;
