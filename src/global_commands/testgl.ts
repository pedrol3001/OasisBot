import Discord from 'discord.js';

module.exports = {
  name: 'testgl',
  aliases: ['tsgl'],
  args: false,
  cooldown: 1,
  description: 'Test Global Command',
  usage: '[args]',
  roles: ['Teste'],

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(msg: Discord.Message, args: Array<string>) {
    msg.channel.send('Testado Global ;)');
  },
};
