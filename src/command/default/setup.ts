import ICommand from "interfaces/ICommand";
import Discord, { MessageAttachment } from 'discord.js';
import { CreateGuildController } from "@repositories/guild/useCases/CreateGuild/CreateGuildController";
import { ICreateGuildDTO } from "@repositories/guild/dtos/ICreateGuildDTO";
import { LoadGuildsController } from "@repositories/guild/useCases/LoadGuilds/LoadGuildsController";

const command: ICommand = {
  name: 'setup guilds',
  aliases: ['sg'],
  args: false,
  description: 'Setup bots guilds in system',
  group: 'global',
  cooldown: 300,

  async execute(msg: Discord.Message): Promise<void> {

    const guilds = msg.client.guilds.cache;

    await Promise.all(guilds.map(async (guild) =>{
      await CreateGuildController.handle({id: guild.id} as ICreateGuildDTO);
    }));

    await LoadGuildsController.handle(msg.client);

    await msg.reply("Server configured !!");

  }
};

export default command;
