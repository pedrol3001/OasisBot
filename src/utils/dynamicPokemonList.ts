import Discord from 'discord.js';

import { DynamicMessage, OnReaction } from 'discord-dynamic-messages';

class DynamicPokemonList extends DynamicMessage {
  private name: string;

  private pageSize: number;

  private list: Array<string>;

  private embed: Discord.MessageEmbed;

  private counter: number;

  private options: Discord.MessageEmbedOptions;

  private emojiRenderCount: number;

  public constructor(
    name: string,
    list: Array<string>,
    pageSize: number,
    options: Discord.MessageEmbedOptions,
  ) {
    super({
      volatile: true,
      onError: err => {
        console.error(err);
      },
    });
    this.emojiRenderCount = 0;
    this.name = name;
    this.options = options;
    this.pageSize = pageSize;
    this.list = list;
    this.counter = 0;

    this.embed = new Discord.MessageEmbed(this.options);
  }

  @OnReaction(':arrow_left:')
  protected decrement(): void {
    if (this.counter === 0)
      this.counter = Math.ceil(this.list.length / this.pageSize) - 1;
    else this.counter -= 1;
    this.emojiRenderCount = 0;
  }

  @OnReaction(':arrow_right:')
  protected increment(): void {
    if (this.counter === Math.ceil(this.list.length / this.pageSize) - 1)
      this.counter = 0;
    else this.counter += 1;

    this.emojiRenderCount = 0;
  }

  protected render(): Discord.MessageEmbed {
    this.embed.setTitle(
      this.list.length > 0
        ? `${this.name} - ${this.counter + 1}/${Math.ceil(
            this.list.length / this.pageSize,
          )}`
        : `${this.name} - Empty`,
    );

    let list_aux;
    if (this.counter === Math.ceil(this.list.length / this.pageSize))
      list_aux = this.list.slice(
        this.counter * this.pageSize,
        this.list.length - this.counter * this.pageSize,
      );
    list_aux = this.list.slice(
      this.counter * this.pageSize,
      (this.counter + 1) * this.pageSize,
    );

    this.embed.fields = [];
    list_aux.forEach(pkm => {
      // const pokemon = await PokeAPI.Pokemon.resolve(pkm);
      // console.log(pokemon);
      this.embed.addField(
        `${(this.list.indexOf(pkm) + 1).toString().padStart(3, '0')}`,
        pkm,
        true,
      );
    });

    return this.embed;
  }
}

export default DynamicPokemonList;
