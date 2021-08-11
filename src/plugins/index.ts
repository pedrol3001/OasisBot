import Discord from 'discord.js';
import IPlugin from '@discord/interfaces/IPlugin';
import { container } from 'tsyringe';
import PokemonManager from './modules/PokemonManager';
import WerewolfManager from './modules/WerewolfManager';

container.registerSingleton<IPlugin>('WerewolfManager', WerewolfManager);

container.registerSingleton<IPlugin>('PokemonManager', PokemonManager);

export const PluginsController = {
  handle(client: Discord.Client) {
    const werewolfManager = container.resolve<WerewolfManager>('WerewolfManager');
    const pokemonManager = container.resolve<PokemonManager>('PokemonManager');

    werewolfManager.setup().then(() => werewolfManager.plug(client.commandHandler));

    pokemonManager.setup().then(() => pokemonManager.plug(client.commandHandler));
  },
};
