import { ICommandHandler } from '@interfaces/ICommandHandler';
import { IPluginsHanlder } from '@interfaces/IPluginsHandler';
import { AbstractPlugin } from './class/AbstractPlugin';

class PluginsHandler implements IPluginsHanlder {
  private _plugins: Map<string, AbstractPlugin>;

  constructor(plugins_managers: AbstractPlugin[]) {
    this._plugins = new Map();

    plugins_managers.forEach((plugin) => {
      this._plugins.set(plugin.name, plugin);
    });
  }

  get plugins(): Map<string, AbstractPlugin> {
    return this._plugins;
  }

  setup(command_handler: ICommandHandler) {
    this._plugins.forEach(async (plugin: AbstractPlugin, key: string) => {
      await plugin.setup();
      await plugin.set(command_handler);
      key = plugin.id;
    });
  }
}

export default PluginsHandler;
