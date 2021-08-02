import Discord from 'discord.js';
import CommandHandler from 'commands/index';
import { LoadGuildController } from "@guilds/useCases/LoadGuild/LoadGuildController";

const client = new Discord.Client({ shardCount: 1 });

client.commandHandler = new CommandHandler();

client.once('ready', () => {
  const loadGuildController = new LoadGuildController();
  loadGuildController.handle(client);

  client.user.setActivity("Online!");
  console.log('Ready!');
});

client.on(
  'message',
  async (msg: Discord.Message): Promise<void> => {
    try{
      await client.commandHandler.handle(msg);
    } catch(err){
      err.log()
    }
  },
);

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

export {client};
