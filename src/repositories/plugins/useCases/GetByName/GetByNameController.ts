import { ICreatePluginDTO } from "@repositories/plugins/dtos/ICreatePluginDTO";
import { container } from "tsyringe";
import { Plugin } from "../../entities/Plugin"
import { GetByNameUseCase } from "./GetByNameUseCase";

const GetByNameController = {


  async handle(name: string): Promise<Plugin> {

    const getByNameUseCase = container.resolve(
      GetByNameUseCase
    );
    return await getByNameUseCase.execute(name);
  }

}

export {GetByNameController};
