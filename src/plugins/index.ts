import Discord from "discord.js";
import IPlugin from "interfaces/IPlugin";
import { container } from "tsyringe";
import WerewolfManager from "../../modules/WerewolfManager";

container.registerSingleton<IPlugin>(
  "WerewolfManager",
  WerewolfManager
);


export const PluginsController = {

  handle (client: Discord.Client) {

      const werewolfManager = container.resolve<WerewolfManager>("WerewolfManager");
      werewolfManager.setup().then(
        () => werewolfManager.plug(client.commandHandler)
      );
  }
}

