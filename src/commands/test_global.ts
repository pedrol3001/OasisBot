/* eslint-disable @typescript-eslint/no-unused-vars */
import Discord from 'discord.js';
import PokeAPI from 'pokeapi-typescript';
import Command, { CommandGroups } from '../models/command';

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
      const teste = await PokeAPI.Pokemon.resolve(25);
      console.log(teste);
      msg.channel.send('Testado Global ;)');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};

export default cmd;
