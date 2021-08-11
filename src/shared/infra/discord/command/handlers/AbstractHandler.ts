import Discord from 'discord.js';
import IHandler from './IHandler';

abstract class AbstractHandler implements IHandler {
  private nextHandler: IHandler;

  public setNext(handler: IHandler): IHandler {
    this.nextHandler = handler;
    return handler;
  }

  public async handle(msg: Discord.Message): Promise<void> {
    if (this.nextHandler) {
      await this.nextHandler.handle(msg);
    }
  }
}

export { AbstractHandler };
