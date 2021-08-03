import { Guild } from "@repositories/guild/entities/Guild";
import { getRepository, Repository } from "typeorm";
import { ICreatePluginDTO } from "../dtos/ICreatePluginDTO";
import { Plugin } from "../entities/Plugin"
import { IPluginsRepository } from "./IPluginsRepository";

class PluginsRepository implements IPluginsRepository {
  private repository: Repository<Plugin>;

  constructor() {
    this.repository = getRepository(Plugin);
  }

  async create({id, name } : ICreatePluginDTO): Promise<Plugin> {
    const plugin = this.repository.create({
      id,
      name,
      guilds: Promise.resolve([] as Guild[])
    });

    return await this.repository.save(plugin);
  }

  async findById(id: string): Promise<Plugin> {
    const plugin = await this.repository.findOne(id);
    return plugin;
  }

  async findByName(name: string): Promise<Plugin> {
    const plugin = await this.repository.findOne({name: name});
    return plugin;
  }
}

export { PluginsRepository };
