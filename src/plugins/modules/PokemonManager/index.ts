import { AbstractPlugin } from "../../class/AbstractPlugin";
import Pokedex from 'pokedex-promise-v2'
import { IPokemonDTO } from "./interfaces/IPokemonDTO";

class PokemonManager extends AbstractPlugin {

  private _pokedex: Pokedex;

  constructor(){
    super();
    this._pokedex = new Pokedex();
  }


  getRandomPokemon(): Promise<IPokemonDTO> {
    return this._pokedex.getPokemonSpeciesByName(10);
  }

}

export default PokemonManager;
