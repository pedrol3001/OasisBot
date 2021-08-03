import { ICreatePluginDTO } from "@plugins_repo/dtos/ICreatePluginDTO";
import { CreateGuildUseCase } from "./CreatePluginUseCase";
import { Plugin } from "@plugins_repo/entities/Plugin"
import { container } from "tsyringe";

const CreatePluginController = {

  async handle(data: ICreatePluginDTO): Promise<Plugin> {

    const saveGuildUseCase = container.resolve(
      CreateGuildUseCase
    );
    return await saveGuildUseCase.execute(data);
  }

}

export {CreatePluginController};
