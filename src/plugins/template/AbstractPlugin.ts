import { AddCommandsFromFolder } from "@command/providers/AddCommands/implementations/AddCommandsFromFolder";
import { RemoveCommandsFromFolder } from "@command/providers/RemoveCommands/implementations/RemoveCommandsFromFolder";
import { CreatePluginController } from "@repositories/plugin/useCases/CreatePlugin/CreatePluginController";
import { GetByNameController } from "@repositories/plugin/useCases/GetByName/GetByNameController";
import Discord from "discord.js";
import { ICommandHandler } from "interfaces/ICommand";
import IPlugin from "interfaces/IPlugin";
import path from "path";

abstract class AbstractPlugin implements IPlugin{
  id: string;

  async setup() : Promise<void>{

    const plugin = await GetByNameController.handle(this.constructor.name);

    if(plugin){
      this.id = plugin.id;
    }else{
      const newPlugin = await CreatePluginController.handle({name: this.constructor.name});
      this.id = newPlugin.id;
    }

  }

  plug(commands: ICommandHandler):void{
    const folder = path.resolve(__dirname, "..", "modules", this.constructor.name, 'commands');
    commands.edit(AddCommandsFromFolder, folder,this.id);
  }

  unplug(commands: ICommandHandler):void{
    const folder = path.resolve(__dirname, "..", 'modules', this.constructor.name, 'commands');
    commands.edit(RemoveCommandsFromFolder, folder);
  }
}

export {AbstractPlugin};
