import { ICreateGuildDTO} from "@guilds_repo/dtos/ICreateGuildDTO";
import { Guild } from "@guilds_repo/entities/Guild";

interface IGuildsRepository {
  create(data: ICreateGuildDTO): Promise<void>;
  findById(id: string): Promise<Guild>;
}

export { IGuildsRepository };
