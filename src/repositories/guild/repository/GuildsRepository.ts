import { getRepository, Repository } from "typeorm";
import { ICreateGuildDTO } from "@guilds_repo/dtos/ICreateGuildDTO";
import { Guild } from "@guilds_repo/entities/Guild"
import { IGuildsRepository } from "./IGuildsRepository";

class GuildsRepository implements IGuildsRepository {
  private repository: Repository<Guild>;

  constructor() {
    this.repository = getRepository(Guild);
  }

  async create({ id, prefix }: ICreateGuildDTO): Promise<void> {
    const guild = this.repository.create({
      id,
      prefix,
      plugins : Promise.resolve([] as Guild[])
    });
    await this.repository.save(guild);
  }

  async findById(id: string): Promise<Guild> {
    const guild = await this.repository.findOne(id);
    return guild;
  }

}

export { GuildsRepository };
