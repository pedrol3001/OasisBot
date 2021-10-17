import { Guild, Prisma } from '@prisma/client';
import { ICreateGuildDTO } from 'repositories/guild/dtos/ICreateGuildDTO';
import { ConditionalArray } from 'utils/types';
import { IGuildsRepository } from './IGuildsRepository';

import { prisma } from 'discord-oasis';

class GuildsRepository implements IGuildsRepository {
  private repository: Prisma.GuildDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

  constructor() {
    this.repository = prisma.guild;
  }

  async create({ id, prefix }: ICreateGuildDTO): Promise<Guild> {
    const guild = await this.repository.create({
      data: {
        id,
        prefix,
      },
    });
    return guild;
  }

  async update({ id, prefix }: ICreateGuildDTO): Promise<void> {
    await this.repository.update({ where: { id }, data: { prefix } });
  }

  async findById<T extends string | Array<string>>(id: T): Promise<ConditionalArray<Guild, T>> {
    const guilds = await this.repository.findMany({ where: { id: { in: id } } });
    return (id instanceof Array ? guilds : guilds[0]) as ConditionalArray<Guild, T>;
  }
}

export { GuildsRepository };
