import { IPluginsRepository } from "@plugins_repo/repository/IPluginsRepository";
import { ICreatePluginDTO } from "@plugins_repo/dtos/ICreatePluginDTO";
import { Plugin } from "@plugins_repo/entities/Plugin"
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
