import Discord from "discord.js";
import { inject, injectable } from "tsyringe";
import { Guild } from "../../entities/Guild";
import { IGuildsRepository } from "../../repository/IGuildsRepository";


@injectable()
class LoadGuildClientUseCase {
  constructor(
    @inject("GuildsRepository")
    private guildRepository: IGuildsRepository
  ) {}

  public async execute(client : Discord.Client): Promise<void> {

    await Promise.all(client.guilds.cache.map(async (guild) => {
      const defaultGuild: Guild = new Guild();
      defaultGuild.id = guild.id;
      try{
        const guildFromDb = await this.guildRepository.findById(guild.id);
        Object.assign(guild,guildFromDb);
      }catch(e){
        Object.assign(guild,defaultGuild);
      }
    }));
  }
}

export { LoadGuildClientUseCase };
