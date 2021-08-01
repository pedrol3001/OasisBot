import Discord from "discord.js"
import ICommand from "../ICommand";

export default interface IHandler {
  setNext(handler: IHandler): IHandler;

  handle(msg: Discord.Message) : void;
}
