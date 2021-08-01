import ICommand from "commands/ICommand";
import Discord from "discord.js"
import IHandler from "./IHandler";

abstract class AbstractHandler implements IHandler
{
    private nextHandler: IHandler;

    public setNext(handler: IHandler): IHandler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(msg: Discord.Message): void {
        if (this.nextHandler) {
            this.nextHandler.handle(msg);
        }
    }
}

export {AbstractHandler};
