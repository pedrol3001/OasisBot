/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord, { MessageEmbed } from 'discord.js';
import Command, { CommandGroups } from '../interfaces/command';
import GuildManager from '../managers/guild_manager';
import SystemManager from '../managers/system_manager';

const cmd: Command = {
  name: 'help',
  aliases: ['h'],
  description: 'List all of my commands or info about a specific command.',
  usage: '[command name]',
  group: [CommandGroups.global],

  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    const data = new Array<string>();

    data.push(':globe_with_meridians: __**Global:**__');
    SystemManager.getInstance().commandHandler.commands.forEach(command => {
      data.push(
        `**${process.env.PREFIX}${command.name} ${
          command.usage ? command.usage : ''
        }**:  ${command.description}`,
      );
    });

    if (msg.guild) {
      const guild = SystemManager.getInstance().getGuild(msg.guild.id);
      data.push('\n:fleur_de_lis: __**Guild:**__');
      guild.commandHandler.commands.forEach(command => {
        data.push(
          `**${guild && guild.prefix ? guild.prefix : process.env.PREFIX}${
            command.name
          } ${command.usage ? command.usage : ''}**:  ${command.description}`,
        );
      });
    }

    const mensage_block = new MessageEmbed()
      .setTitle('All Comands')
      .setColor('#ffa500');

    mensage_block.setDescription(data);

    msg.channel.send(mensage_block);

    return true;
  },
};

export default cmd;
