import Discord from "discord.js";
import { ICommandHandler } from "interfaces/ICommand";

export default interface IPlugin {
  setup() : Promise<void>;
  plug(commands: ICommandHandler): void;
  unplug(commands: ICommandHandler) : void;
}
