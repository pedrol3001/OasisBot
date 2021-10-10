import { ICommand, Discord } from '@pedrol3001/discord-oasis';

const command: ICommand = {
  name: 'pokemon',
  aliases: ['pkm'],
  args: false,
  description: 'Spawn a random pokemon',
  group: 'guildOnly',

  async execute(msg: Discord.Message): Promise<void> {
    await msg.reply(`${msg.manager.getRandomPokemon()}`);
  },
};

export default command;
