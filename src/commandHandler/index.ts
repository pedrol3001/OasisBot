import Discord from 'discord.js';
import fs from 'fs';

import ICommand from "commandHandler/ICommand";
import DreamError from "@error/DreamError";
import { LoadGuildClientController } from '@guilds/useCases/LoadGuildClient/LoadGuildClientController';
import { client } from 'client';

class CommandHandler {
  private _commands: Discord.Collection<string, ICommand>;
  private cooldowns: Discord.Collection<
    string,
    Discord.Collection<Discord.Snowflake, number>
  >;

  public constructor() {
    this._commands = new Discord.Collection<string, ICommand>();
    this.cooldowns = new Discord.Collection<
      string,
      Discord.Collection<Discord.Snowflake, number>
    >();
  }

  public async handle(msg: Discord.Message): Promise<void> {
    await this.readPrefix(msg);
    await this.executeMsg(msg);
  }

  public async readPrefix (msg: Discord.Message){

    try {
      if (msg.author.bot) return;

      const loadGuildClientController = new LoadGuildClientController();
      loadGuildClientController.handle(client);

      let prefix;

      //if (process.env.PREFIX && msg.content.startsWith(process.env.PREFIX))
      //prefix = process.env.PREFIX; // global prefix

      if (msg.guild.prefix && msg.content.startsWith(msg.guild.prefix))
        prefix = msg.guild.prefix; // guild prefix

      if (!prefix) return;
      msg.content = msg.content.slice(prefix.length);
    } catch (err) {
      new DreamError('Error processing the message the bot', err, {
        message: msg.content,
      }).log();
    }
  }

  public async executeMsg(msg: Discord.Message): Promise<void> {
    try {
      let command: ICommand;

      msg.args = msg.content.trim().split(/\s+/);

      const aux_name = new Array<string>();

      // composed commands names handler
      while (!command && msg.args.length > 0) {
        aux_name.push(msg.args.shift().toLowerCase());

        command =
          this._commands.get(aux_name.join(' ')) ||
          this._commands.find(
            (cmd: ICommand) =>
              cmd.aliases && cmd.aliases.includes(aux_name.join(' ')),
          );
      }
      // comand exists
      if (!command) return;

      let flag_role = false;

      // roles handler
      if (msg.guild && command.roles) {

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
          return;
        }
      }

      // permissions handler
      if (msg.guild && command.permissions) {

        for (const requiredPermission of command.permissions) {
          if (!msg.member.hasPermission(requiredPermission)) {
            msg.reply(
              `This command requires the permissions ${command.permissions.join(
                ', ',
              )}`,
            );
            return;
          }
        }
      }

      // filter dmOnly handler

      if (
        command.group.some(gp => gp === "dmOnly") &&
        msg.channel.type !== 'dm'
      ) {
        msg.reply('You can only use this command inside dms');
        return;
      }

      // filtter args handler
      if (
        command.args !== undefined &&
        command.args === true &&
        msg.args.length === 0
      ) {
        const reply = `You didn't provide any arguments, ${msg.author}!\n
          The proper usage would be: \`${process.env.PREFIX}${command.name}
          ${command.usage ? command.usage : ''}\``;

        msg.channel.send(reply);
        return;
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

        msg.channel.send(reply);
        return;
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
          return;
        }
      }

      timestamps.set(msg.author.id, now);
      setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

      // execute
      await command.execute(msg);
    } catch (err) {
      msg.channel.send(`Error, try again`);
      new DreamError('Error executing mesage', err, {
        message: msg,
      }).log();
    }
  }

  public addCommands(
    folderPath: string,
    filter?: "guildOnly" | "global" | "dmOnly",
    count = 0,
  ): void {
    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.ts'));

      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}${file}`)];

        const command: ICommand = require(`${folderPath}${file}`).default;

        const is_command = this._commands.get(command.name);

        if (is_command) {
          console.log(`Command ${command.name} duplicated.`);
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

        this.addCommands(folderPath, filter, (count += 1));
      } else
        new DreamError('Error adding commands from folder', err, {
          folder: folderPath,
          filter,
        }).log();
    }
  }

  public get commands(): Array<ICommand> {
    return Array.from(this._commands.values());
  }

  public rmCommands(
    folderPath: string,
    filter?: "guildOnly" | "global" | "dmOnly",
    count = 0,
  ): void {
    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.ts'));


      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}${file}`)];

        const command: ICommand = require(`${folderPath}${file}`).default;


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
