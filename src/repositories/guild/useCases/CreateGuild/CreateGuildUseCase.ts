import { ICreateGuildDTO } from 'repositories/guild/dtos/ICreateGuildDTO';
import { IGuildsRepository } from '@guild/prisma/IGuildsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateGuildUseCase {
  constructor(
    @inject('GuildsRepository')
    private guildRepository: IGuildsRepository,
  ) {}

  public async execute(data: ICreateGuildDTO): Promise<void> {
    await this.guildRepository.create(data);
  }
}

export { CreateGuildUseCase };
