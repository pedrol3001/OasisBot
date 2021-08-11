import { ICreatePluginDTO } from '@repositories/plugin/dtos/ICreatePluginDTO';
import { CreateGuildUseCase } from './CreatePluginUseCase';
import { Plugin } from '@repositories/plugin/infra/typeorm/entities/Plugin';
import { container } from 'tsyringe';

const CreatePluginController = {
  async handle(data: ICreatePluginDTO): Promise<Plugin> {
    const saveGuildUseCase = container.resolve(CreateGuildUseCase);
    return await saveGuildUseCase.execute(data);
  },
};

export { CreatePluginController };
