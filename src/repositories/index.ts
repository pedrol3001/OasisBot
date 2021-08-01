import { container } from "tsyringe";
import {GuildsRepository} from "@guilds/repository/GuildsRepository"
import { IGuildsRepository } from "@guilds/repository/IGuildsRepository";

container.registerSingleton<IGuildsRepository>(
  "GuildsRepository",
  GuildsRepository
);
