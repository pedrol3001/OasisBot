import { AbstractPlugin } from '@plugin/class/AbstractPlugin';
import Pokedex from 'pokedex-promise-v2';
import { IPokemonDTO } from './interfaces/IPokemonDTO';

class PokemonManager extends AbstractPlugin {
  private _pokedex: Pokedex;

  constructor(commands_folder: string) {
    super(commands_folder);
    this._pokedex = new Pokedex();
  }

  getRandomPokemon(): Promise<IPokemonDTO> {
    return this._pokedex.getPokemonSpeciesByName(10);
  }
}

export default PokemonManager;
