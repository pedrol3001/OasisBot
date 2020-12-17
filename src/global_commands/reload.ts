import Discord from 'discord.js';
import SystemManager from '../managers/system_manager';

module.exports = {
  name: 'reload',
  aliases: ['rld'],
  args: false,
  cooldown: 5,
  description: 'Reload bot',
  permissions: ['ADMINISTRATOR'],

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(msg: Discord.Message, args: Array<string>) {
    SystemManager.reset()
      .then(() => {
        msg.reply(`Bot reloaded`);
        console.log(
          `Reloaded as ${SystemManager.getInstance().client.user.tag}`,
        );
        return true;
      })
      .catch(err => {
        msg.reply(`Error reseting bot`);
        console.error(err);
        return false;
      });
  },
};
