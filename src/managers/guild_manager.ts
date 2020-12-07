import Discord from 'discord.js';

class GuildManager {
  private guildId: Discord.Snowflake;

  private _prefix: string;

  public constructor(guildId: Discord.Snowflake) {
    this.guildId = guildId;
    this.setPrefix();
  }

  public set prefix(prefix: string) {
    this.prefix = prefix;
  }

  public get prefix(): string {
    return this.prefix;
  }

  public setPrefix() {

  }
}

export default GuildManager;
