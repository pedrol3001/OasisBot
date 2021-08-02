import { IGuildsRepository } from "@repositories/guilds/repository/IGuildsRepository";
import { inject, injectable } from "tsyringe";
import Discord from 'discord.js';
import { Guild } from "@repositories/guilds/entities/Guild";
import { ICreateGuildDTO } from "@repositories/guilds/dtos/ICreateGuildDTO";


interface IPrefixChange {
  id: string;
  prefix: string;
}


@injectable()
class SetGuildPrefixUseCase{

  constructor(
    @inject("GuildsRepository")
    private guildRepository: IGuildsRepository
  ) {}

  public async execute({id, prefix}: IPrefixChange): Promise<void> {
    const guild = await this.guildRepository.findById(id);

    guild.prefix = prefix;

    await this.guildRepository.create(guild);
  }

}

export {SetGuildPrefixUseCase};