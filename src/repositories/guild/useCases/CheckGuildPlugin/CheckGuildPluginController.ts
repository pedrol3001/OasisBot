
import { container } from "tsyringe";
import { CheckGuildPluginUseCase } from "./CheckGuildPluginUseCase";

const CheckGuildPluginController = {
  async handle(guild_id: string, plugin_id): Promise<boolean> {

    const checkGuildPluginUseCase = container.resolve(
      CheckGuildPluginUseCase
    );

    const result = await checkGuildPluginUseCase.execute(guild_id, plugin_id);

    return result;
  }
}

export { CheckGuildPluginController };
