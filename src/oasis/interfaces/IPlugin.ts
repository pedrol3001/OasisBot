import { ICommandHandler } from './ICommandHandler';

interface IPlugin {
  name: string;
  id: string;
  commands_folder: string;
  setup(): Promise<void>;
  plug(commands: ICommandHandler, commands_folder: string): void;
  unplug(commands: ICommandHandler): void;
}
