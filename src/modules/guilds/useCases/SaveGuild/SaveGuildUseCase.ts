import { IGuildsRepository } from "@guilds/repository/IGuildsRepository";
import { inject, injectable } from "tsyringe";
import Discord from 'discord.js';
import { Guild } from "@guilds/entities/Guild";
import { ICreateGuildDTO } from "@guilds/dtos/ICreateGuildDTO";

@injectable()
class SaveGuildUseCase{

  constructor(
    @inject("GuildsRepository")
    private guildRepository: IGuildsRepository
  ) {}

  public async execute(data : ICreateGuildDTO): Promise<void> {
    await this.guildRepository.create(data);
  }

}

export {SaveGuildUseCase};
