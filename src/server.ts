import 'reflect-metadata';
import { root_dir } from './config/environment';

import path from 'path';
import WerewolfManager from './plugins/WerewolfManager';
//import PokemonManager from './plugins/PokemonManager';

import { Intents, Oasis } from 'discord-oasis';
import TestManager from './plugins/TestManager';

const client = new Oasis({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
  globalPrefix: process.env.PREFIX || '!',
  commandsFolder: `${path.resolve(root_dir, 'commands')}`,
  plugins: [
    new WerewolfManager(path.resolve(root_dir, 'plugins', 'WerewolfManager', 'commands')),
    new TestManager(path.resolve(root_dir, 'plugins', 'TestManager', 'commands')),
  ],
});

client.listen(process.env.DISC_TOKEN || 'Missing Token');
