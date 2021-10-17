import 'reflect-metadata';
import { root_dir } from 'config/enviroment';

import path from 'path';
import WerewolfManager from './plugins/WerewolfManager';
import PokemonManager from './plugins/PokemonManager';

import { Oasis } from 'discord-oasis';

const client = new Oasis({
  shard_count: parseInt(process.env.SHARD_COUNT || '1', 10),
  commands_folder: `${path.resolve(root_dir, 'commands')}`,
  plugins: [
    new WerewolfManager(path.resolve(root_dir, 'plugins', 'WerewolfManager', 'commands')),
    new PokemonManager(path.resolve(root_dir, 'plugins', 'PokemonManager', 'commands')),
  ],
});

client.setGuildsLoader();

client.setGuildsCreator();

client.listen(process.env.DISC_TOKEN);
