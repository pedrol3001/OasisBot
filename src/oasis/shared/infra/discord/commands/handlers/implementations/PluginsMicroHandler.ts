import { CommandError } from '@discord/commands/error/CommandError';
import { CheckGuildsPluginController } from '@repositories/guild/useCases/CheckGuildsPlugin/CheckGuildsPluginController';
import Discord from 'discord.js';
import { IMicroHandler } from '../IMicroHandler';

class PluginsMicroHandler {
  async handle(msg: Discord.Message): Promise<void> {
    const guild_id = msg.guild?.id || undefined;
    const author_id = msg.author.id;
    const plugin_id = msg.command.plugin_id;

    let havePlugin = false;
    if (plugin_id) {
      // Check if guild can use the plugin
      if (guild_id) {
        havePlugin = await CheckGuildsPluginController.handle([guild_id], plugin_id);

        // Check if the user is in any server that can use the plugin
      } else {
        const filteredGuilds = msg.client.guilds.cache.filter((guild) => {
          return guild.members.cache.some((member) => member.user.id === author_id);
        });
        const filteredGuild_ids = filteredGuilds.map((guild) => guild.id);
        havePlugin = await CheckGuildsPluginController.handle(filteredGuild_ids, plugin_id);
      }
    }

    if (!havePlugin && plugin_id) {
      const reply = "You can't use this plugin";
      throw new CommandError(reply, msg.channel);
    }
    msg.manager = msg.temp[plugin_id];
    msg.temp = undefined;
  }
}

export { PluginsMicroHandler };
