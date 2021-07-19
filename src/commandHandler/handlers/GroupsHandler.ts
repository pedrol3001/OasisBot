import { CommandError } from "commandHandler/error/CommandError";
import ICommand from "commandHandler/interfaces/ICommand";
import IHandler from "commandHandler/interfaces/IHandler";
import Discord from "discord.js"
import { singleton } from "tsyringe";

@singleton()
class GroupsHandler implements IHandler{

  handle(msg: Discord.Message, command: ICommand){


    // filter dmOnly handler
    if (
      command.group === "dmOnly" &&
      msg.channel.type !== 'dm'
    ) {
      const reply = 'You can only use this command inside dms';
      throw new CommandError(reply,msg.channel );
    }
  }

}

export {GroupsHandler}
