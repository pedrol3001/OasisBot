import ICommand from '@interfaces/ICommand';
import { IRemoveCommands } from '../IRemoveCommands';
import Discord from 'discord.js';
import fs from 'fs';
import oasisError from '@error/OasisError';

class RemoveCommandsFromPlugin implements IRemoveCommands {
  public handle(collection: Discord.Collection<string, ICommand>, ...args): void {
    // TODO
  }
}

export { RemoveCommandsFromPlugin };
