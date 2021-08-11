import { ConditionalArray } from 'utils/types';
import { ICreatePluginDTO } from '../../../dtos/ICreatePluginDTO';
import { Plugin } from '../entities/Plugin';

interface IPluginsRepository {
  create(data: ICreatePluginDTO): Promise<Plugin>;
  findById<T extends string | Array<string>>(id: T): Promise<ConditionalArray<Plugin, T>>;
  findByName(name: string): Promise<Plugin>;
}

export { IPluginsRepository };
