import { Plugin } from "../../entities/Plugin"
import { inject, injectable } from "tsyringe";
import { IPluginsRepository } from "@repositories/plugins/repository/IPluginsRepository";

@injectable()
class GetByNameUseCase{

  constructor(
    @inject("PluginsRepository")
    private pluginRepository: IPluginsRepository
  ) {}
  public async execute(name : string): Promise<Plugin> {
    return await this.pluginRepository.findByName(name);
  }

}

export {GetByNameUseCase};
