import Discord from "discord.js"
import ICommand from "./ICommand";

export default interface IHandler {
  handle(msg: Discord.Message, command: ICommand) : void;
}
