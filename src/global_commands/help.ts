import Discord from "discord.js"
import SystemManager from "../managers/system_manager";

module.exports = {
  name: 'help',
  aliases: ['h'],
  args: false,
  description: 'List all of my commands or info about a specific command.',
  usage: 'help [command name]',
  dmOnly: false,

  async execute(msg: Discord.Message, args: Array<string>) {
    msg.channel.send("Ajudado ;)");
    return true;
  },
};
