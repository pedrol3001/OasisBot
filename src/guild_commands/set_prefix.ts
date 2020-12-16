import Discord from "discord.js"
import SystemManager from "../managers/system_manager";
import GuildManager from "../managers/guild_manager";
import Server from "../models/Server";

module.exports = {
  name: 'set prefix',
  aliases: ['spfx'],
  args: true,
  cooldown: 1,
  description: 'Set guild prefix',
  usage: 'set prefix [preifx]',

  async execute(msg: Discord.Message, args: Array<string>) {
    const db = SystemManager.getInstance().serverDb;

    if (args.length > 0) {

      let entity = db.create({
        guild_id: msg.guild.id,
        prefix: args[0],
      });


      await db.save(entity).then(() => {
        msg.channel.send(`Prefix set to ${args[0]}`)
        SystemManager.getInstance().getGuild(msg.guild.id).prefix = args[0];
        return true;
      });

    } else await msg.channel.send(`You didn't provide any prefix to set`);

  },
};
