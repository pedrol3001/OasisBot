import Discord from "discord.js";
import { ICreateGuildDTO} from "../dtos/ICreateGuildDTO";
import { Guild } from "../entities/Guild";

interface IGuildsRepository {
  create(data: ICreateGuildDTO): Promise<void>;
  findById(id: Discord.Snowflake): Promise<Guild>;
}

export { IGuildsRepository };
