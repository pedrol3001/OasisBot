import { CommandError } from "commandHandler/error/CommandError";
import ICommand from "commandHandler/interfaces/ICommand";
import IHandler from "commandHandler/interfaces/IHandler";
import Discord from "discord.js"

class CooldownsHandler implements IHandler{

  private cooldowns: Discord.Collection<
    string,
    Discord.Collection<string, number>
  >;

  public constructor() {
    this.cooldowns = new Discord.Collection<
      string,
      Discord.Collection<string, number>
    >();
  }


  handle(msg: Discord.Message, command: ICommand){

    // cooldowns handler
    if (!this.cooldowns.has(command.name)) {
      this.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = this.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const reply =
          `Please wait ${timeLeft.toFixed(
            1,
          )} more second(s) before reusing the \`${command.name}\` command.`;

        throw new CommandError(reply ,msg.channel );
      }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

  }

}

export {CooldownsHandler}
