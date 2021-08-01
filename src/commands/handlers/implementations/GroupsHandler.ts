import Discord from "discord.js"
import ICommand from "commands/ICommand";
import { singleton } from "tsyringe";
import { CommandError } from "commands/error/CommandError";
import { AbstractHandler } from "../AbstractHandler";

@singleton()
class GroupsHandler extends AbstractHandler{

  handle(msg: Discord.Message) : void{

    // filter dmOnly handler
    if (msg.command.group === "dmOnly" && msg.channel.type !== 'dm') {
      const reply = 'You can only use this command inside dms';
      throw new CommandError(reply ,msg.channel);
    }

    super.handle(msg);
  }

}

export {GroupsHandler}
