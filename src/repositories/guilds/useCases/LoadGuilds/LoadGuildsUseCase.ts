import Discord from "discord.js";
import { inject, injectable } from "tsyringe";
import { Guild } from "../../entities/Guild";
import { IGuildsRepository } from "../../repository/IGuildsRepository";


@injectable()
class LoadGuildsUseCase {
  constructor(
    @inject("GuildsRepository")
    private guildRepository: IGuildsRepository
  ) {}

  public async execute(guilds : Discord.Collection<string,Discord.Guild>): Promise<void> {

    await Promise.all(guilds.map(async (guild) => {
      const defaultGuild: Guild = new Guild(guild.id);
      try{
        const guildFromDb = await this.guildRepository.findById(guild.id);
        Object.assign(guild,guildFromDb);
      }catch(e){
        Object.assign(guild,defaultGuild);
      }
    }));
  }
}

export { LoadGuildsUseCase };
