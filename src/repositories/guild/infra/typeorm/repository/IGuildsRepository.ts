import { ICreateGuildDTO } from '@repositories/guild/dtos/ICreateGuildDTO';
import { Guild } from '@repositories/guild/infra/typeorm/entities/Guild';
import { ConditionalArray } from 'utils/types';

interface IGuildsRepository {
  create(data: ICreateGuildDTO): Promise<void>;
  findById<T extends string | Array<string>>(id: T): Promise<ConditionalArray<Guild, T>>;
}

export { IGuildsRepository };
