import IPlugin from '@discord/interfaces/IPlugin';
import { root_dir } from '@config/enviroment';
import { ICommandHandler } from '@discord/interfaces/ICommandHandler';
import { GetByNameController } from '@repositories/plugin/useCases/GetByName/GetByNameController';
import { AddCommandsFromFolder } from '@command/providers/AddCommands/implementations/AddCommandsFromFolder';
import { CreatePluginController } from '@repositories/plugin/useCases/CreatePlugin/CreatePluginController';
import { RemoveCommandsFromFolder } from '@command/providers/RemoveCommands/implementations/RemoveCommandsFromFolder';
import path from 'path';

abstract class AbstractPlugin implements IPlugin {
  id: string;
  name: string;

  async setup(): Promise<void> {
    this.name = this.constructor.name;

    const plugin = await GetByNameController.handle(this.constructor.name);

    if (plugin) {
      this.id = plugin.id;
    } else {
      const newPlugin = await CreatePluginController.handle({ name: this.constructor.name });
      this.id = newPlugin.id;
    }
  }

  plug(commands: ICommandHandler): void {
    const folder = path.resolve(root_dir, 'plugins', 'modules', this.constructor.name, 'commands');
    commands.edit(AddCommandsFromFolder, folder, this.id);
  }

  unplug(commands: ICommandHandler): void {
    const folder = path.resolve(root_dir, 'plugins', 'modules', this.constructor.name, 'commands');
    commands.edit(RemoveCommandsFromFolder, folder);
  }
}

export { AbstractPlugin };
