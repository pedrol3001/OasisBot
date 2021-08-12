import ICommand from '@interfaces/ICommand';
import { IRemoveCommands } from '../IRemoveCommands';
import Discord from 'discord.js';
import fs from 'fs';
import oasisError from '@error/OasisError';

class RemoveCommandsFromFolder implements IRemoveCommands {
  public handle(collection: Discord.Collection<string, ICommand>, ...args: string[]): void {
    const [folderPath] = args;

    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter((file) => file.endsWith(process.env.NODE_ENV === 'production' ? '.js' : '.ts'));

      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}/${file}`)];

        const command: ICommand = require(`${folderPath}/${file}`).default;

        collection.delete(command.name);
      }
    } catch (err) {
      throw new oasisError('Error deleting commands from folder', err, {
        folder: folderPath,
      });
    }
  }
}

export { RemoveCommandsFromFolder };
