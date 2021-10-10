import { Guild } from 'repositories/guild/infra/typeorm/entities/Guild';

interface ICreatePluginDTO {
  id?: string;
  name: string;
}

export { ICreatePluginDTO };
