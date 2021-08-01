import Discord from "discord.js"
import { container } from "tsyringe";
import { SetGuildPrefixUseCase } from "./SetGuildPrefixUseCase";

class SetGuildPrefixController{


  handle(id: string, prefix: string): void {

    const setGuildPrefixUseCase = container.resolve(
      SetGuildPrefixUseCase
    );
    setGuildPrefixUseCase.execute({id, prefix});
  }

}

export {SetGuildPrefixController};
