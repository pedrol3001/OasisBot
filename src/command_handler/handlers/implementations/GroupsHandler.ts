import Discord from "discord.js"
import ICommand from "interfaces/ICommand";
import { singleton } from "tsyringe";
import { CommandError } from "command_handler/error/CommandError";
import { AbstractHandler } from "../AbstractHandler";

@singleton()
class GroupsHandler extends AbstractHandler{

  async handle(msg: Discord.Message) : Promise<void>{

    // filter dmOnly handler
    if (msg.command.group === "dmOnly" && msg.channel.type !== 'dm') {
      const reply = 'You can only use this command inside dms';
      throw new CommandError(reply ,msg.channel);
    }

    await super.handle(msg);
  }

}

export {GroupsHandler}
