import Discord from 'discord.js';

import { DynamicMessage, OnReaction } from 'discord-dynamic-messages';

import PokeAPI from 'pokeapi-typescript';

class dynamicPokemonList extends DynamicMessage {
  private name: string;

  private pageSize: number;

  private list: Array<string>;

  private length: number;

  private counter: number;

  private options: Discord.MessageEmbedOptions;

  public constructor(
    name: string,
    pageSize: number,
    options: Discord.MessageEmbedOptions,
  ) {
    super();
    this.name = name;
    this.length = 0;
    this.options = options;
    this.pageSize = pageSize;
    this.counter = 0;

    this.reRender();
  }

  // private async setPokelist() {}

  @OnReaction(':arrow_right:')
  protected async increment(): Promise<void> {
    if (this.counter === Math.ceil(this.list.length / this.pageSize) - 1)
      this.counter = 0;
    else this.counter += 1;
  }

  @OnReaction(':arrow_left:')
  protected async decrement(): Promise<void> {
    if (this.counter === 0)
      this.counter = Math.ceil(this.list.length / this.pageSize) - 1;
    else this.counter -= 1;
  }

  protected render(): Discord.MessageEmbed {
    const lyricsEmbed = new Discord.MessageEmbed(this.options);
    lyricsEmbed.setTitle(
      this.list.length > 0
        ? `${this.name} - ${this.counter + 1}/${Math.ceil(
            this.list.length / this.pageSize,
          )}`
        : `${this.name} - Empty`,
    );

    lyricsEmbed.setDescription(this.list.join('\n'));
    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return lyricsEmbed;
  }
}

export default dynamicPokemonList;
