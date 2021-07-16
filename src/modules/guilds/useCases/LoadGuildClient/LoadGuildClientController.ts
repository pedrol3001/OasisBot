import Discord from "discord.js";
import { container } from "tsyringe";
import {LoadGuildClientUseCase} from "./LoadGuildClientUseCase"

class LoadGuildClientController {
  handle(client: Discord.Client): void {

    const loadGuildClientUseCase = container.resolve(
      LoadGuildClientUseCase
    );

    loadGuildClientUseCase.execute(client);
  }
}

export { LoadGuildClientController };
