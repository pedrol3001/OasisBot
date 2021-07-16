import { ICreateGuildDTO } from "@guilds/dtos/ICreateGuildDTO";
import { container } from "tsyringe";
import { SaveGuildUseCase } from "./SaveGuildUseCase";

class SaveGuildController{


  handle(data: ICreateGuildDTO): void {

    const saveGuildUseCase = container.resolve(
      SaveGuildUseCase
    );
    saveGuildUseCase.execute(data);
  }

}

export {SaveGuildController};
