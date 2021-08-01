import { getRepository, Repository } from "typeorm";
import { ICreateGuildDTO } from "../dtos/ICreateGuildDTO";
import { Guild } from "../entities/Guild"
import { IGuildsRepository } from "./IGuildsRepository";
import Discord from "discord.js"

class GuildsRepository implements IGuildsRepository {
  private repository: Repository<Guild>;

  constructor() {
    this.repository = getRepository(Guild);
  }

  async create({ id, prefix }: ICreateGuildDTO): Promise<void> {
    const guild = this.repository.create({
      id,
      prefix
    });
    await this.repository.save(guild);
  }

  async findById(id: string): Promise<Guild> {
    const guild = await this.repository.findOneOrFail(id);
    return guild;
  }



}

export { GuildsRepository };
