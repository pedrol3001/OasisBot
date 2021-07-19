import ICommand from "commandHandler/interfaces/ICommand"
import Discord from "discord.js"

class CommandError {
    constructor(
      public message: string,
      public channel: Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel
    ) {}
}

export {CommandError}
