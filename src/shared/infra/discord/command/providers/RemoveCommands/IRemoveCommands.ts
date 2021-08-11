import Discord from 'discord.js';
import ICommand from '@discord/interfaces/ICommand';

interface IRemoveCommands {
  handle(collection: Discord.Collection<string, ICommand>, ...args): void;
}

export { IRemoveCommands };
