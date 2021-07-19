import Discord from "discord.js";
import ICommand from "commandHandler/interfaces/ICommand";
import { CommandError } from "commandHandler/error/CommandError";
import IHandler from "commandHandler/interfaces/IHandler";
import { singleton } from "tsyringe";


@singleton()
class RolesHandler implements IHandler{

  handle(msg : Discord.Message , command: ICommand){

    if (msg.guild && command.roles) {

      const roles = command.roles.filter((required_role)=>{
        return msg.guild.roles.cache.some(role => role.name === required_role) &&
          msg.member.roles.cache.some(role => role.name === required_role)
          ? true
          : false;
      });

      if (roles.length === 0){
        const reply = `This command requires one of the roles ${command.roles.join(',')}`;
        throw new CommandError(reply ,msg.channel );
      }
    }
  }
}

export {RolesHandler}
