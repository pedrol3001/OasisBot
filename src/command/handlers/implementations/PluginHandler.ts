import { CommandError } from "@command/error/CommandError";
import { CheckGuildPluginController } from "@repositories/guild/useCases/CheckGuildPlugin/CheckGuildPluginController";
import Discord from "discord.js";
import { singleton } from "tsyringe";
import { AbstractHandler } from "../AbstractHandler";

@singleton()
class PluginHandler extends AbstractHandler{

  async handle(msg: Discord.Message) : Promise<void>{

    const guild_id = msg.guild.id;
    const havePlugin = await CheckGuildPluginController.handle(guild_id, msg.command.plugin);

    if(havePlugin){
      return await super.handle(msg);
    }
    const reply = "You can't use this plugin";
    throw new CommandError(reply,msg.channel);
  }
}

export {PluginHandler}
