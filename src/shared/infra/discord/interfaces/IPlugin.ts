import { ICommandHandler } from "./ICommandHandler";

export default interface IPlugin {
  setup() : Promise<void>;
  plug(commands: ICommandHandler): void;
  unplug(commands: ICommandHandler) : void;
}
