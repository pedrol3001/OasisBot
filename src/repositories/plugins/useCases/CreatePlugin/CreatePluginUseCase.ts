import { Plugin } from "../../entities/Plugin"
import { inject, injectable } from "tsyringe";
import { IPluginsRepository } from "@repositories/plugins/repository/IPluginsRepository";
import { ICreatePluginDTO } from "@repositories/plugins/dtos/ICreatePluginDTO";

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
