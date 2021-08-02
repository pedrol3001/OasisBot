import Discord from "discord.js"
import ICommand from "commands/ICommand";
import { CommandError } from "commands/error/CommandError";
import { AbstractHandler } from "../AbstractHandler";

class ArgsHandler extends AbstractHandler{

  handle(msg: Discord.Message) : void{
    // filtter args handler
    if (
      msg.command.args !== undefined &&
      msg.command.args === true &&
      msg.args.length === 0
    ) {
      const reply = `You didn't provide any arguments, ${msg.author}!\n
        The proper usage would be: \`${process.env.PREFIX}${msg.command.name}
        ${msg.command.usage ? msg.command.usage : ''}\``;

      throw new CommandError(reply ,msg.channel );
    }

    if (
      msg.command.args !== undefined &&
      msg.command.args === false &&
      msg.args.length !== 0
    ) {
      const reply = `This command does not require any arguments,
        ${msg.author}!\n
        The proper usage would be: \`${process.env.PREFIX}${msg.command.name}
        ${msg.command.usage ? msg.command.usage : ''}\``;

      throw new CommandError(reply, msg.channel );
    }

    super.handle(msg);
  }

}

export {ArgsHandler};