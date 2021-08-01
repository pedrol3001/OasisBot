import { IGuildsRepository } from "@repositories/guilds/repository/IGuildsRepository";
import { inject, injectable } from "tsyringe";
import Discord from 'discord.js';
import { Guild } from "@repositories/guilds/entities/Guild";
import { ICreateGuildDTO } from "@repositories/guilds/dtos/ICreateGuildDTO";

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
