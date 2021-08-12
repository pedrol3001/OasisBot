import Discord from 'discord.js';
import ICommand, { ICommandGroups } from '@discord/interfaces/ICommand';

interface IAddCommands {
  handle(collection: Discord.Collection<string, ICommand>, ...args): void;
}

export { IAddCommands };