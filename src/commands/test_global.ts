/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import PokeAPI, { IPokedex } from 'pokeapi-typescript';
import SystemManager from '../managers/system_manager';
import Command, { CommandGroups } from '../interfaces/command';
import Pokemon from '../modules/pokemon/pokemon';
import DynamicPokemonList from '../utils/dynamicPokemonList';

const cmd: Command = {
  name: 'test global',
  aliases: ['tsgl'],
  args: false,
  cooldown: 1,
  description: 'Test Global Command',
  usage: '[args]',
  group: [CommandGroups.global],
  roles: ['Teste'],

  async execute(msg: Discord.Message, args: Array<string>): Promise<boolean> {
    try {
      console.log(
        SystemManager.getInstance().client.emojis.cache.map(emoji => {
          return `${emoji.name} - ${emoji.url}`;
        }),
      );
      msg.channel.send('Testado Global ;)');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

export default cmd;
