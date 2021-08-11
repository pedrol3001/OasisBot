import { getRepository, Repository } from "typeorm";
import { ICreateGuildDTO } from "@repositories/guild/dtos/ICreateGuildDTO";
import { Guild } from "@repositories/guild/infra/typeorm/entities/Guild"
import { IGuildsRepository } from "./IGuildsRepository";
import { ConditionalArray } from "utils/types";


class GuildsRepository implements IGuildsRepository {
  private repository: Repository<Guild>;

  constructor() {
    this.repository = getRepository(Guild);
  }

  async create({ id, prefix }: ICreateGuildDTO): Promise<void> {
    const guild = this.repository.create({
      id,
      prefix,
      plugins : []
    });
    await this.repository.save(guild);
  }

  // Generic funtion tha receives a string or an array of string and returns a object or a array of object

  async findById<T extends string | Array<string>>(id: T): Promise<ConditionalArray<Guild,T>> {
    const guilds =  await this.repository.findByIds(id instanceof Array ? id : [id])
    return (id instanceof Array ? guilds : guilds[0]) as ConditionalArray<Guild,T>;
  }
}

export { GuildsRepository };
