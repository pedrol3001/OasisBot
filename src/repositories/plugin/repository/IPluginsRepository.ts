import { ICreatePluginDTO} from "../dtos/ICreatePluginDTO";
import { Plugin } from "../entities/Plugin";

interface IPluginsRepository {
  create(data: ICreatePluginDTO): Promise<Plugin>;
  findById(id: string): Promise<Plugin>;
  findByName(name: string): Promise<Plugin>;
}

export { IPluginsRepository };
