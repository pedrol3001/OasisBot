import { ICreatePluginDTO } from "@repositories/plugins/dtos/ICreatePluginDTO";
import { container } from "tsyringe";
import { Plugin } from "../../entities/Plugin"
import { CreateGuildUseCase } from "./CreatePluginUseCase";

const CreatePluginController = {

  async handle(data: ICreatePluginDTO): Promise<Plugin> {

    const saveGuildUseCase = container.resolve(
      CreateGuildUseCase
    );
    return await saveGuildUseCase.execute(data);
  }

}

export {CreatePluginController};
