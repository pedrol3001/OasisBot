import Discord from "discord.js"
const { DynamicMessage, OnReaction } = require('discord-dynamic-messages');


class DynamicList extends DynamicMessage {

  private name: string;
  private pageSize: number;
  private list: Array<string>;
  private options: Object;


  public constructor(name: string, list: Array<string>, pageSize: number, options: Object) {
    super();
    this.name = name;
    this.options = options;
    this.pageSize = pageSize;
    this.list = list;
    this.counter = 0;
    this.reRender();
  }

  @OnReaction(':arrow_right:')
  protected increment(user: Discord.User, channel: Discord.Channel, reaction: any) {

    if (this.counter == Math.ceil(this.list.length / this.pageSize) - 1)
      this.counter = 0;
    else
      this.counter += 1;
  }
  @OnReaction(':arrow_left:')
  protected decrement(user: Discord.User, channel: Discord.Channel, reaction: any) {
    if (this.counter == 0)
      this.counter = Math.ceil(this.list.length / this.pageSize) - 1;
    else
      this.counter -= 1;
  }
  protected render() {

    const lyricsEmbed = new Discord.MessageEmbed(this.options);
    lyricsEmbed.setTitle(this.list.length > 0
      ? (this.name) + " - " + (this.counter + 1) + "/" + (Math.ceil(this.list.length / this.pageSize))
      : (this.name) + " - Empty");

    var list_aux;
    if (this.counter == Math.ceil(this.list.length / this.pageSize))
      list_aux = this.list.slice(this.counter * this.pageSize, this.list.length - (this.counter * this.pageSize));
    list_aux = this.list.slice(this.counter * this.pageSize, (this.counter + 1) * this.pageSize);
    lyricsEmbed.setDescription(list_aux.join("\n"));
    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return lyricsEmbed;
  }
}


module.exports.DynamicList = DynamicList;
