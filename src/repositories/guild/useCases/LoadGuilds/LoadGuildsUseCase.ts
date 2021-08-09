import Discord from "discord.js";
import { inject, injectable } from "tsyringe";
import { Guild } from "@guilds_repo/entities/Guild";
import { IGuildsRepository } from "@guilds_repo/repository/IGuildsRepository";


@injectable()
class LoadGuildsUseCase {
  constructor(
    @inject("GuildsRepository")
    private guildRepository: IGuildsRepository
  ) {}

  public async execute(guilds : Discord.Collection<string,Discord.Guild>): Promise<void> {

    await Promise.all(guilds.map(async (guild) => {
      const defaultGuild: Guild = new Guild(guild.id);

      const guildFromDb = await this.guildRepository.findById(guild.id);
      if (guildFromDb) {
        Object.assign(guild,guildFromDb);
      }else{
        Object.assign(guild,defaultGuild);
      }
    }));
  }
}

export { LoadGuildsUseCase };
