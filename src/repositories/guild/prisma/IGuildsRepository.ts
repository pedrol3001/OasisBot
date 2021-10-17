import { ICreateGuildDTO } from '@guild/dtos/ICreateGuildDTO';
import { ConditionalArray } from 'utils/types';
import { Guild } from '@prisma/client';

interface IGuildsRepository {
  create(data: ICreateGuildDTO): Promise<Guild>;
  findById<T extends string | Array<string>>(id: T): Promise<ConditionalArray<Guild, T>>;
  update(data: ICreateGuildDTO): Promise<void>;
}

export { IGuildsRepository };
