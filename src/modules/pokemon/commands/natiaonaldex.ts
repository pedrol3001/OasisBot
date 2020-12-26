/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import PokeAPI, { IPokedex } from 'pokeapi-typescript';
import SystemManager from '../../../managers/system_manager';
import Command, { CommandGroups } from '../../../interfaces/command';
import DynamicPokemonList from '../../../utils/dynamicPokemonList';
import Pokemon from '../pokemon';
import DreamError from '../../../handlers/error_handler';

const cmd: Command = {
  name: 'nationaldex',
  aliases: ['ndex'],
  cooldown: 1,
  args: false,
  description: 'Show National Dex',
  group: [CommandGroups.guildOnly],
  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    try {
      const pokemonManager = <Pokemon>(
        SystemManager.getInstance()
          .getGuild(msg.guild.id)
          .modules.get('pokemon')
      );

      const pokemon_list = await (
        await pokemonManager.loadPokeapi<IPokedex>(PokeAPI.Pokedex, 1)
      ).pokemon_entries.map(pkdx => {
        return pkdx.pokemon_species.name;
      });

      const msg_aux = new DynamicPokemonList('National Dex', pokemon_list, 21, {
        color: '#ff3355',
      });

      msg_aux.sendTo(msg.channel);
      // msg.channel.send('Testado Global ;)');
      return true;
    } catch (err) {
      new DreamError('Error getting national dex from api', err).log();
      return false;
    }
  },
};

export default cmd;
