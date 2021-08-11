import Discord from 'discord.js';

export default interface IHandler {
  setNext(handler: IHandler): IHandler;

  handle(msg: Discord.Message): Promise<void>;
}
