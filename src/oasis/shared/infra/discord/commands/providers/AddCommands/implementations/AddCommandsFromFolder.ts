import ICommand, { ICommandGroups } from 'oasis/interfaces/ICommand';
import { IAddCommands } from '../IAddCommands';
import Discord from 'discord.js';
import fs from 'fs';
import oasisError from '@error/OasisError';

class AddCommandsFromFolder implements IAddCommands {
  public handle(collection: Discord.Collection<string, ICommand>, ...args: string[]): void {
    const [folderPath, plugin] = args[0];

    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(process.env.NODE_ENV === 'production' ? '.js' : '.ts'));

      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}/${file}`)];

        const command: ICommand = require(`${folderPath}/${file}`).default;

        command.plugin_id = plugin || undefined;

        const already_exists = collection.get(command.name);

        if (already_exists) {
          throw new oasisError(`Error adding command ${command.name} from folder, this commands already exists.`);
        }

        collection.set(command.name, command); // Add command to collection
      }
    } catch (err) {
      throw new oasisError('Error adding commands from folder', err, {
        folder: folderPath[0],
      });
    }
  }
}

export { AddCommandsFromFolder };
