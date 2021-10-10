import { inject, injectable } from 'tsyringe';
import { IGuildsRepository } from 'repositories/guild/infra/typeorm/repository/IGuildsRepository';

@injectable()
class CheckGuildsPluginUseCase {
  constructor(
    @inject('GuildsRepository')
    private guildRepository: IGuildsRepository,
  ) {}

  async execute(guild_ids: string[], plugin_id: string): Promise<boolean> {
    const guilds = await this.guildRepository.findById(guild_ids);

    if (
      guilds.some((guild) => {
        return guild.plugins.some((plugin) => {
          return plugin.id === plugin_id;
        });
      })
    ) {
      return true;
    }
    return false;
  }
}

export { CheckGuildsPluginUseCase };
