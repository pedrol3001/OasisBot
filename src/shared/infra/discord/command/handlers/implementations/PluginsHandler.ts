import { CommandError } from "@command/error/CommandError";
import { CheckGuildsPluginController } from "@repositories/guild/useCases/CheckGuildsPlugin/CheckGuildsPluginController";
import Discord from "discord.js";
import { AbstractHandler } from "../AbstractHandler";

class PluginsHandler extends AbstractHandler{

  async handle(msg: Discord.Message) : Promise<void>{

    const guild_id = msg.guild?.id || undefined;
    const author_id = msg.author.id;

    let havePlugin = false;
    if(guild_id){
      havePlugin = await CheckGuildsPluginController.handle([guild_id], msg.command.plugin);
    }else{
      const filteredGuilds = msg.client.guilds.cache.filter(guild => {
        return guild.members.cache.some(member => member.user.id === author_id);
      });

      const filteredGuild_ids = filteredGuilds.map(guild => guild.id);

      havePlugin = await CheckGuildsPluginController.handle(filteredGuild_ids, msg.command.plugin);
    }

    if(havePlugin){
      return await super.handle(msg);
    }
    const reply = "You can't use this plugin";
    throw new CommandError(reply,msg.channel);
  }
}

export {PluginsHandler}
