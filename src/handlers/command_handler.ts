/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import Discord from 'discord.js';
import fs from 'fs';

class CommandHandler {
  private _commands: Discord.Collection<string, Record<string, unknown>>;

  private cooldowns: Discord.Collection<
    string,
    Discord.Collection<Discord.Snowflake, number>
  >;

  public constructor() {
    this._commands = new Discord.Collection<string, Record<string, unknown>>();
    this.cooldowns = new Discord.Collection<
      string,
      Discord.Collection<Discord.Snowflake, number>
    >();
  }

  public executeMsg(msg: Discord.Message): boolean {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let command: any;

      const args = msg.content.trim().split(/\s+/);

      const aux_name = new Array<string>();

      // composed commands names handler
      while (!command && args.length > 0) {
        aux_name.push(args.shift().toLowerCase());

        command =
          this._commands.get(aux_name.join(' ')) ||
          this._commands.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (cmd: any) =>
              cmd.aliases && cmd.aliases.includes(aux_name.join(' ')),
          );
      }
      // comand exists
      if (!command) return false;

      let flag_role = false;

      // roles handler
      if (msg.guild && command.roles) {
        // eslint-disable-next-line no-restricted-syntax
        for (const requiredRole of command.roles) {
          if (
            msg.guild.roles.cache.some(role => role.name === requiredRole) &&
            msg.member.roles.cache.some(role => role.name === requiredRole)
          ) {
            flag_role = true;
            break;
          }
        }
        if (!flag_role) {
          msg.reply(
            `This command requires one of the roles ${command.roles.join(',')}`,
          );
          return false;
        }
      }

      // permissions handler
      if (msg.guild && command.permissions) {
        // eslint-disable-next-line no-restricted-syntax
        for (const requiredPermission of command.permissions) {
          if (!msg.member.hasPermission(requiredPermission)) {
            msg.reply(
              `This command requires the permissions ${command.permissions.join(
                ', ',
              )}`,
            );
            return false;
          }
        }
      }

      // filter dmOnly handler

      if (command.dmOnly && msg.channel.type !== 'dm') {
        msg.reply('You can only use this command inside dms');
        return false;
      }

      // filtter args handler
      if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${msg.author}!`;

        if (command.usage) {
          reply += `\nThe proper usage would be: \`${process.env.PREFIX}${command.usage}\``;
        }

        msg.channel.send(reply);
        return false;
      }
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
          msg.reply(
            `Please wait ${timeLeft.toFixed(
              1,
            )} more second(s) before reusing the \`${command.name}\` command.`,
          );
          return false;
        }
      }

      timestamps.set(msg.author.id, now);
      setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

      // execute
      return command.execute(msg, args);
    } catch (err) {
      console.log(err);
      msg.channel.send(`Error, try again`);
      return false;
    }
  }

  public addCommands(folderPath: string): void {
    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.ts'));

      // eslint-disable-next-line no-restricted-syntax
      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}${file}`)];

        const command = require(`${folderPath}${file}`);

        const is_command = this._commands.get(command.name);

        if (is_command) {
          console.log(`Command ${command.name} duplicated.`);
        } else {
          this._commands.set(command.name, command);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get commands(): Array<any> {
    return Array.from(this._commands.values());
  }

  public rmCommands(folderPath: string): void {
    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.ts'));

      // eslint-disable-next-line no-restricted-syntax
      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}${file}`)];

        const command = require(`${folderPath}${file}`);

        const is_command = this._commands.get(command.name);

        if (!is_command) {
          console.log(`Command ${command.name} does not exist.`);
        } else {
          this._commands.delete(command.name);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default CommandHandler;
