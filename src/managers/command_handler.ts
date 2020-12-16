import Discord from 'discord.js';
import fs from 'fs';

class CommandHandler {

  private commands: Discord.Collection<string, Object>;
  private cooldowns: Discord.Collection<string, Discord.Collection<Discord.Snowflake, number>>;

  public constructor() {
    this.commands = new Discord.Collection<string, Object>();
    this.cooldowns = new Discord.Collection<string, Discord.Collection<Discord.Snowflake, number>>();
  }


  public executeMsg(msg: Discord.Message): boolean {

    try {

      var args: Array<string>, command: any, commandName: string = null;

      args = msg.content.trim().split(/\s+/);


      let aux_name = new Array<string>();

      while (!command && args.length > 0) {

        aux_name.push(args.shift().toLowerCase());

        command = this.commands.get(aux_name.join(" "))
          || this.commands.find((cmd: any) => cmd.aliases && cmd.aliases.includes(aux_name.join(" ")));

      }
      //commandName = args.shift().toLowerCase();
      //command = this.commands.get(commandName)
      //  || this.commands.find((cmd: any) => cmd.aliases && cmd.aliases.includes(commandName));

      if (!command) return false; // retorna se comando não existir


      if (command.dmOnly && msg.channel.type !== 'dm') {
        msg.reply('You can only use this command inside dms');
        return false
      }

      if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${msg.author}!`;

        if (command.usage) {
          reply += `\nThe proper usage would be: \`${process.env.PREFIX}${command.usage}\``;
        }

        msg.channel.send(reply);
        return false;
      }

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
          msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
          return false;
        }
      }

      timestamps.set(msg.author.id, now);
      setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);


      return command.execute(msg, args);

    } catch (err) {
      console.log(err);
      msg.channel.send(`Error, try again`);
    }




  }

  public addCommands(folderPath: string) {
    try {

      const commandFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".ts"));

      for (const file of commandFiles) {
        const command = require(`${folderPath}${file}`);

        let is_command = this.commands.get(command.name);

        if (is_command) {
          console.log(`Command ${command.name} duplicated.`);
        }
        else {
          this.commands.set(command.name, command);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  public rmCommands(folderPath: string) {

    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(".ts"));

      for (const file of commandFiles) {
        const command = require(`${folderPath}${file}`);

        let is_command = this.commands.get(command.name);

        if (!is_command) {
          console.log(`Command ${command.name} does not exist.`);
        }
        else {
          this.commands.delete(command.name);
        }
      }

    } catch (err) {
      console.error(err);
    }

  }

}

export default CommandHandler;
