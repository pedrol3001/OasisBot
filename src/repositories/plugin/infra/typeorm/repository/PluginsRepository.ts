import { Guild } from 'repositories/guild/infra/typeorm/entities/Guild';
import { getRepository, Repository } from 'typeorm';
import { ConditionalArray } from 'utils/types';
import { ICreatePluginDTO } from '../../../dtos/ICreatePluginDTO';
import { Plugin } from '../entities/Plugin';
import { IPluginsRepository } from './IPluginsRepository';

class PluginsRepository implements IPluginsRepository {
  private repository: Repository<Plugin>;

  constructor() {
    this.repository = getRepository(Plugin);
  }

  async create({ id, name }: ICreatePluginDTO): Promise<Plugin> {
    const plugin = this.repository.create({
      id,
      name,
      guilds: Promise.resolve([] as Guild[]),
    });

    return await this.repository.save(plugin);
  }

  async findById<T extends string | Array<string>>(id: T): Promise<ConditionalArray<Plugin, T>> {
    const plugins = await this.repository.findByIds(id instanceof Array ? id : [id]);
    return (id instanceof Array ? plugins : plugins[0]) as ConditionalArray<Plugin, T>;
  }

  async findByName(name: string): Promise<Plugin> {
    const plugin = await this.repository.findOne({ name: name });
    return plugin;
  }
}

export { PluginsRepository };
