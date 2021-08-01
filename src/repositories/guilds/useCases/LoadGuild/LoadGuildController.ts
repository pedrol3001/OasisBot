import Discord from "discord.js";
import { container } from "tsyringe";
import {LoadGuildUseCase} from "./LoadGuildsUseCase"

class LoadGuildController {
  handle(client: Discord.Client): void {

    const guilds = client.guilds.cache;

    const loadGuildUseCase = container.resolve(
      LoadGuildUseCase
    );

    loadGuildUseCase.execute(guilds);
  }
}

export { LoadGuildController };
