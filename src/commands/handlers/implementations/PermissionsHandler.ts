import Discord from "discord.js";
import ICommand from "commands/ICommand";
import { singleton } from "tsyringe";
import { CommandError } from "commands/error/CommandError";
import { AbstractHandler } from "../AbstractHandler";


@singleton()
class PermissionsHandler extends AbstractHandler{

  handle(msg: Discord.Message) : void{

    // permissions handler
    if (msg.guild && msg.command.permissions) {

      for (const requiredPermission of msg.command.permissions) {
        if (!msg.member.hasPermission(requiredPermission)) {
          const reply = `This command requires the permissions ${msg.command.permissions.join(', ',)}`;
          throw new CommandError(reply,msg.channel);
        }
      }
    }

    super.handle(msg);
  }

}

export {PermissionsHandler}
