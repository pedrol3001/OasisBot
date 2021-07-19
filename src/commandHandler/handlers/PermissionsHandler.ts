import { CommandError } from "commandHandler/error/CommandError";
import ICommand from "commandHandler/interfaces/ICommand";
import IHandler from "commandHandler/interfaces/IHandler";
import Discord from "discord.js";
import { singleton } from "tsyringe";


@singleton()
class PermissionsHandler implements IHandler{

  handle(msg: Discord.Message, command: ICommand){

    // permissions handler
    if (msg.guild && command.permissions) {

      for (const requiredPermission of command.permissions) {
        if (!msg.member.hasPermission(requiredPermission)) {
          const reply = `This command requires the permissions ${command.permissions.join(', ',)}`;
          throw new CommandError(reply,msg.channel );
        }
      }
    }
  }

}

export {PermissionsHandler}
