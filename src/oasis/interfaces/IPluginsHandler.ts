import { AbstractPlugin } from '@plugin/class/AbstractPlugin';
import { ICommandHandler } from './ICommandHandler';

export interface IPluginsHanlder {
  setup(command_handler: ICommandHandler);
  get plugins(): Map<string, AbstractPlugin>;
}
