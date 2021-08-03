import { ICreateGuildDTO } from "@repositories/guild/dtos/ICreateGuildDTO";
import { container } from "tsyringe";
import { CreateGuildUseCase } from "./CreateGuildUseCase";

const CreateGuildController = {


  async handle(data: ICreateGuildDTO): Promise<void> {

    const saveGuildUseCase = container.resolve(
      CreateGuildUseCase
    );
    await saveGuildUseCase.execute(data);
  }

}

export {CreateGuildController};
