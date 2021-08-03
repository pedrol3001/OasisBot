import Discord from "discord.js";
import ICommand from "interfaces/ICommand";
import { singleton } from "tsyringe";
import { CommandError } from "command_handler/error/CommandError";
import { AbstractHandler } from "../AbstractHandler";


@singleton()
class RolesHandler extends AbstractHandler{

  async handle(msg : Discord.Message) : Promise<void>{

    if (msg.guild && msg.command.roles) {

      const roles = msg.command.roles.filter((required_role)=>{
        return msg.guild.roles.cache.some(role => role.name === required_role) &&
          msg.member.roles.cache.some(role => role.name === required_role)
          ? true
          : false;
      });

      if (roles.length === 0){
        const reply = `This command requires one of the roles ${msg.command.roles.join(',')}`;
        throw new CommandError(reply ,msg.channel );
      }
    }

    await super.handle(msg);
  }
}

export {RolesHandler}
