import { ICommand, Discord } from 'discord-oasis';

import { CheckGuildsPluginController } from 'repositories/guild/useCases/CheckGuildsPlugin/CheckGuildsPluginController';

const command: ICommand = {
  name: 'help',
  aliases: ['h'],
  args: true,
  usage: '[command]',
  description: 'Show bot commands',
  group: 'global',

  async execute(msg: Discord.Message): Promise<void> {
    const response: string = '';

    msg.client.command_handler.commands.forEach(async (command: ICommand) => {
      if (!command.plugin_id) {
        // Send command
      } else {
        if (msg.guild) {
          const guild_id = msg.guild.id;
          const havePlugin = await CheckGuildsPluginController.handle([guild_id], msg.command.plugin_id);
        }
      }
    });
  },
};

export default command;
