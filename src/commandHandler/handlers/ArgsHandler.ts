import { CommandError } from "commandHandler/error/CommandError";
import ICommand from "commandHandler/interfaces/ICommand";
import IHandler from "commandHandler/interfaces/IHandler";
import Discord from "discord.js"
import { singleton } from "tsyringe";

@singleton()
class ArgsHandler implements IHandler{

  handle(msg: Discord.Message, command: ICommand){
    // filtter args handler
    if (
      command.args !== undefined &&
      command.args === true &&
      msg.args.length === 0
    ) {
      const reply = `You didn't provide any arguments, ${msg.author}!\n
        The proper usage would be: \`${process.env.PREFIX}${command.name}
        ${command.usage ? command.usage : ''}\``;

      throw new CommandError(reply ,msg.channel );
    }

    if (
      command.args !== undefined &&
      command.args === false &&
      msg.args.length !== 0
    ) {
      const reply = `This command does not require any arguments,
        ${msg.author}!\n
        The proper usage would be: \`${process.env.PREFIX}${command.name}
        ${command.usage ? command.usage : ''}\``;

      throw new CommandError(reply, msg.channel );
    }
  }

}

export {ArgsHandler};
