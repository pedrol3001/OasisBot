import ICommand, { ICommandGroups } from '@discord/interfaces/ICommand';
import { IAddCommands } from '../IAddCommands';
import Discord from 'discord.js';
import fs from 'fs';
import DreamError from '@error/DreamError';

class AddCommandsFromFolder implements IAddCommands {
  public handle(collection: Discord.Collection<string, ICommand>, ...args): void {
    const [folderPath, plugin] = args as string[];

    try {
      const commandFiles = fs
        .readdirSync(folderPath[0])
        .filter((file) => file.endsWith(process.env.NODE_ENV === 'production' ? '.js' : '.ts'));

      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath[0]}/${file}`)];

        const command: ICommand = require(`${folderPath[0]}/${file}`).default;

        command.plugin = plugin || undefined;

        const already_exists = collection.get(command.name);
        if (already_exists) {
          throw new DreamError('Error adding commands from folder, this commands already exists.');
        }

        collection.set(command.name, command); // Add command to collection
      }
    } catch (err) {
      throw new DreamError('Error adding commands from folder', err, {
        folder: folderPath[0],
      });
    }
  }
}

export { AddCommandsFromFolder };
