import * as dotenv from 'dotenv';
import Discord from 'discord.js';
import SystemManager from './managers/system_manager';

dotenv.config();
const client = new Discord.Client();

client.on('ready', () => {
  if (client) {
    console.log(`Logged in as ${client.user.tag}!`);
    SystemManager.init(client);
  } else {
    console.log(`Cliente Discord Falhou!`);
  }
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(process.env.DISC_TOKEN);
