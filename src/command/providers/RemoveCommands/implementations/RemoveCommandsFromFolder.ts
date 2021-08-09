import ICommand from "interfaces/ICommand";
import { IRemoveCommands } from "../IRemoveCommands";
import Discord from 'discord.js'
import fs from 'fs'
import DreamError from "@error/DreamError";

class RemoveCommandsFromFolder implements IRemoveCommands{

  public handle(
    collection: Discord.Collection<string, ICommand>,
    ...args
  ): void {

    const [folderPath]  = args as string[];

    try {
      const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith(process.env.NODE_ENV === 'production' ? '.js' : '.ts'));

      for (const file of commandFiles) {
        delete require.cache[require.resolve(`${folderPath}/${file}`)];

        const command: ICommand = require(`${folderPath}/${file}`).default;

        collection.delete(command.name);

      }
    } catch (err) {
      throw new DreamError('Error deleting commands from folder', err, {
        folder: folderPath,
      });
    }
  }


}

export {RemoveCommandsFromFolder}

