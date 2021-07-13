import Discord from 'discord.js';
import fs from 'fs';

import Command, { CommandGroups } from "@Command/ICommands";
import DreamError from "@Error/DreamError";

class CommandHandler {
  private _commands: Discord.Collection<string, Command>;

  private cooldowns: Discord.Collection<
    string,
    Discord.Collection<Discord.Snowflake, number>
  >;

  public constructor() {
    this._commands = new Discord.Collection<string, Command>();
    this.cooldowns = new Discord.Collection<
      string,
      Discord.Collection<Discord.Snowflake, number>
    >();
  }

  public async executeMsg(msg: Discord.Message): Promise<boolean> {
    try {
      let command: Command;

      const args = msg.content.trim().split(/\s+/);

      const aux_name = new Array<string>();

      // composed commands names handler
      while (!command && args.length > 0) {
        aux_name.push(args.shift().toLowerCase());

        command =
          this._commands.get(aux_name.join(' ')) ||
          this._commands.find(
            (cmd: Command) =>
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

      if (
        command.group.some(gp => gp === CommandGroups.dmOnly) &&
        msg.channel.type !== 'dm'
      ) {
        msg.reply('You can only use this command inside dms');
        return false;
      }

      // filtter args handler
      if (
        command.args !== undefined &&
        command.args === true &&
        args.length === 0
      ) {
        const reply = `You didn't provide any arguments, ${msg.author}!\n
          The proper usage would be: \`${process.env.PREFIX}${command.name}
          ${command.usage ? command.usage : ''}\``;

        msg.channel.send(reply);
        return false;
      }

      if (
        command.args !== undefined &&
        command.args === false &&
        args.length !== 0
      ) {
        const reply = `This command does not require any arguments,
          ${msg.author}!\n
          The proper usage would be: \`${process.env.PREFIX}${command.name}
          ${command.usage ? command.usage : ''}\``;

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
      return await command.execute(msg, args);
    } catch (err) {
      msg.channel.send(`Error, try again`);
      new DreamError('Error executing mesage', err, {
        message: msg,
      }).log();
      return false;
    }
  }

  public addCommands(
    folderPath: string,
    filter?: CommandGroups,
    count = 0,
  ): void {
    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.ts'));

      // eslint-disable-next-line no-restricted-syntax
      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}${file}`)];

        const command: Command = require(`${folderPath}${file}`).default;

        const is_command = this._commands.get(command.name);

        if (is_command) {
          console.log(`Command ${command.name} duplicated.`);
          // eslint-disable-next-line no-prototype-builtins
        } else if (
          filter === undefined ||
          (command.group.length > 0 && command.group.some(gp => gp === filter))
        ) {
          this._commands.set(command.name, command);
        }
      }
    } catch (err) {
      if (count < 5) {
        console.warn(`Erros loading commands, try:${count}`);
        // eslint-disable-next-line no-param-reassign
        this.addCommands(folderPath, filter, (count += 1));
      } else
        new DreamError('Error adding commands from folder', err, {
          folder: folderPath,
          filter,
        }).log();
    }
  }

  public get commands(): Array<Command> {
    return Array.from(this._commands.values());
  }

  public rmCommands(
    folderPath: string,
    filter?: CommandGroups,
    count = 0,
  ): void {
    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.ts'));

      // eslint-disable-next-line no-restricted-syntax
      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}${file}`)];

        const command: Command = require(`${folderPath}${file}`).default;

        // eslint-disable-next-line no-prototype-builtins
        if (
          filter === undefined ||
          (command.group.length > 0 && command.group.some(gp => gp === filter))
        ) {
          this._commands.delete(command.name);
        }
      }
    } catch (err) {
      if (count < 5) {
        console.warn(`Erros removing commands, try:${count}`);
        // eslint-disable-next-line no-param-reassign
        this.rmCommands(folderPath, filter, (count += 1));
      } else
        new DreamError('Error deleting commands from folder', err, {
          folder: folderPath,
          filter,
        }).log();
    }
  }
}

export default CommandHandler;
