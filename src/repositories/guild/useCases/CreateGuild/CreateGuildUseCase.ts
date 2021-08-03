import { IGuildsRepository } from "@repositories/guild/repository/IGuildsRepository";
import { inject, injectable } from "tsyringe";
import { ICreateGuildDTO } from "@repositories/guild/dtos/ICreateGuildDTO";

@injectable()
class CreateGuildUseCase{

  constructor(
    @inject("GuildsRepository")
    private guildRepository: IGuildsRepository
  ) {}

  public async execute(data : ICreateGuildDTO): Promise<void> {
    await this.guildRepository.create(data);
  }

}

export {CreateGuildUseCase};
