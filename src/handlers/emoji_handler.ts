import Discord from 'discord.js';

class EmojiHandler {
  private _emojis: Discord.GuildEmojiManager;

  public constructor(discEmojiManager: Discord.GuildEmojiManager) {
    this._emojis = discEmojiManager;
    this.clearCache();
  }

  public addEmoji(name: string, url: string): Promise<Discord.GuildEmoji> {
    return this._emojis.create(url, name);
  }

  public getEmoji(name: string): Discord.GuildEmoji {
    return this._emojis.cache.find(
      (emoji: Discord.Emoji) => emoji.name === name,
    );
  }

  public getEmojiString(name: string): string {
    const aux_emj = this.getEmoji(name);

    return aux_emj ? `<:${name}:${aux_emj}>` : `:warning:`;
  }

  public rmEmoji(name: string): Promise<Discord.GuildEmoji> {
    const aux = this._emojis.cache.find(
      (emoji: Discord.Emoji) => emoji.name === name,
    );

    return aux.delete();
  }

  public clearCache(): void {
    this._emojis.cache.forEach(emj => {
      emj.delete();
    });
  }
}

export default EmojiHandler;
