import { ICreateGuildDTO } from '@guild/dtos/ICreateGuildDTO';
import { Guild } from '@guild/infra/typeorm/entities/Guild';
import { ConditionalArray } from 'utils/types';

interface IGuildsRepository {
  create(data: ICreateGuildDTO): Promise<void>;
  findById<T extends string | Array<string>>(id: T): Promise<ConditionalArray<Guild, T>>;
}

export { IGuildsRepository };
