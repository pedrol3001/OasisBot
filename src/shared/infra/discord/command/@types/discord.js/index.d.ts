import ICommand from '@discord/interfaces/ICommand';
import CommandHandler from '@commands/';

declare module 'discord.js' {
  export interface Client {
    commandHandler: CommandHandler;
  }

  export interface Message {
    args: Array<string>;
    command: ICommand;
    prefix: string;
    manager: AbstractPlugin;
  }
}
