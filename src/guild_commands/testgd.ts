import Discord from 'discord.js';

module.exports = {
  name: 'testgd',
  aliases: ['tsgd'],
  args: false,
  cooldown: 1,
  description: 'Test Guild Command',
  usage: '[args]',
  roles: ['Teste'],

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(msg: Discord.Message, args: Array<string>) {
    msg.channel.send('Testando Guild ;)');
    return true;
  },
};
