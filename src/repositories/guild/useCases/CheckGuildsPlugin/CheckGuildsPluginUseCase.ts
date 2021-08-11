import { inject, injectable } from 'tsyringe';
import { IGuildsRepository } from '@repositories/guild/infra/typeorm/repository/IGuildsRepository';

@injectable()
class CheckGuildsPluginUseCase {
  constructor(
    @inject('GuildsRepository')
    private guildRepository: IGuildsRepository,
  ) {}

  async execute(guild_ids: string[], plugin_id: string): Promise<boolean> {
    if (plugin_id) {
      const guilds = await this.guildRepository.findById(guild_ids);

      if (
        guilds.some((guild) => {
          guild.plugins.some((plugin) => {
            plugin.id === plugin_id;
          });
        })
      ) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  }
}

export { CheckGuildsPluginUseCase };
