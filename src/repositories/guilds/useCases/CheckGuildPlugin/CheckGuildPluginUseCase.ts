import { inject, injectable } from "tsyringe";

import { Plugin } from "../../../plugins/entities/Plugin"
import { IGuildsRepository } from "@repositories/guilds/repository/IGuildsRepository";

@injectable()
class CheckGuildPluginUseCase {
  constructor(
    @inject("GuildsRepository")
    private guildRepository: IGuildsRepository
  ) {}

  async execute(guild_id: string, plugin_id:string): Promise<boolean> {

    if(plugin_id){
      const guild = await this.guildRepository.findById(guild_id);
      const plugins = await guild.plugins;
      if(plugins.findIndex((plugin)=>{return plugin.id == plugin_id}) !== -1){
        return true
      }
      return false;
    }else{
      return true;
    }
  }
}

export { CheckGuildPluginUseCase };
