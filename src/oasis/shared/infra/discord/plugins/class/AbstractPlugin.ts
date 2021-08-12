import { ICommandHandler } from '@interfaces/ICommandHandler';
import { GetByNameController } from '@plugins_repo//useCases/GetByName/GetByNameController';
import { AddCommandsFromFolder } from '@discord/commands/providers/AddCommands/implementations/AddCommandsFromFolder';
import { CreatePluginController } from '@plugins_repo/useCases/CreatePlugin/CreatePluginController';
import { RemoveCommandsFromPlugin } from '@discord/commands/providers/RemoveCommands/implementations/RemoveCommandsFromPlugin';

abstract class AbstractPlugin {
  id: string;
  name: string;
  commands_folder: string;

  constructor(commands_folder: string) {
    this.commands_folder = commands_folder;
    this.name = this.constructor.name;
  }

  async setup(): Promise<void> {
    const plugin = await GetByNameController.handle(this.constructor.name);

    if (plugin) {
      this.id = plugin.id;
    } else {
      const newPlugin = await CreatePluginController.handle({ name: this.constructor.name });
      this.id = newPlugin.id;
    }
  }

  set(commands: ICommandHandler): void {
    commands.edit(AddCommandsFromFolder, this.commands_folder, this.id);
  }

  unset(commands: ICommandHandler): void {
    commands.edit(RemoveCommandsFromPlugin);
  }
}

export { AbstractPlugin };
