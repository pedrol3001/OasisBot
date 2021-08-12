import 'dotenv/config';
import 'reflect-metadata';

import path from 'path';
import WerewolfManager from 'plugins/WerewolfManager';
import PokemonManager from 'plugins/PokemonManager';

import { Oasis } from 'oasis';

const client = new Oasis({
  shard_count: parseInt(process.env.SHARD_COUNT || '1', 10),
  commands_folder: `${path.resolve('src', 'commands')}`,
  environment: process.env.NODE_ENV || 'development',
  plugins: [
    new WerewolfManager(path.resolve('src', 'plugins', 'WerewolfManager', 'commands')),
    new PokemonManager(path.resolve('src', 'plugins', 'PokemonManager', 'commands')),
  ],
});

client.listen(process.env.DISC_TOKEN);
