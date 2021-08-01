import Discord from "discord.js";
import ICommand from "commands/ICommand";
import { singleton } from "tsyringe";
import { CommandError } from "commands/error/CommandError";
import { AbstractHandler } from "../AbstractHandler";


@singleton()
class RolesHandler extends AbstractHandler{

  handle(msg : Discord.Message) : void{

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

    super.handle(msg);
  }
}

export {RolesHandler}
