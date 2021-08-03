import { CreatePluginController } from "@repositories/plugins/useCases/CreatePlugin/CreatePluginController";
import { GetByNameController } from "@repositories/plugins/useCases/GetByName/GetByNameController";
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

    console.log(plugin);

  }

  plug(commands: ICommandHandler):void{
    const folder = path.resolve('modules', this.constructor.name, 'commands');
    console.log("ID: ", this.id);
    commands.add(folder,this.id);
  }

  unplug(commands: ICommandHandler):void{
    const folder = path.resolve('modules', this.constructor.name, 'commands');
    commands.remove(folder);
  }
}

export {AbstractPlugin};
