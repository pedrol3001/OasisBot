import 'reflect-metadata';
import { root_dir } from './config/environment';

import path from 'path';
import WerewolfManager from './plugins/WerewolfManager';
//import PokemonManager from './plugins/PokemonManager';

import { Intents, Oasis } from 'discord-oasis';

const client = new Oasis({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING],
  global_prefix: '!',
  commands_folder: `${path.resolve(root_dir, 'commands')}`,
  plugins: [
    new WerewolfManager(path.resolve(root_dir, 'plugins', 'WerewolfManager', 'commands')),
    //new PokemonManager(path.resolve(root_dir, 'plugins', 'PokemonManager', 'commands')),
  ],
});

client.listen(process.env.DISC_TOKEN || 'Missing Token');
