import { IPluginsRepository } from "@repositories/plugin/infra/typeorm/repository/IPluginsRepository";
import { ICreatePluginDTO } from "@repositories/plugin/dtos/ICreatePluginDTO";
import { Plugin } from "@repositories/plugin/infra/typeorm/entities/Plugin"
import { inject, injectable } from "tsyringe";

@injectable()
class CreateGuildUseCase{

  constructor(
    @inject("PluginsRepository")
    private pluginRepository: IPluginsRepository
  ) {}
  public async execute(data : ICreatePluginDTO): Promise<Plugin> {
    return await this.pluginRepository.create(data);
  }

}

export {CreateGuildUseCase};
