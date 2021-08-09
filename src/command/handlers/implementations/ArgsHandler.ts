import Discord from "discord.js"
import { CommandError } from "@command/error/CommandError";
import { AbstractHandler } from "../AbstractHandler";

class ArgsHandler extends AbstractHandler{

  async handle(msg: Discord.Message) : Promise<void>{

    // filtter args handler
    if ((msg.command.args && msg.args.length === 0) || !msg.command.args && msg.args.length !== 0) {
      const reply = `You didn't provide any arguments, ${msg.author}!\n` +
        `The proper usage would be: `+
        `\`${msg.guild.prefix}${msg.command.name} ${msg.command.usage ? msg.command.usage : ''}\``;
      throw new CommandError(reply ,msg.channel );
    }

    await super.handle(msg);
  }

}

export {ArgsHandler};
