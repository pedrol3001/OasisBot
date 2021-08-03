import { container } from "tsyringe";
import {GuildsRepository} from "@guilds/repository/GuildsRepository"
import { IGuildsRepository } from "@guilds/repository/IGuildsRepository";
import { IPluginsRepository } from "./plugins/repository/IPluginsRepository";
import { PluginsRepository } from "./plugins/repository/PluginsRepository";

container.registerSingleton<IGuildsRepository>(
  "GuildsRepository",
  GuildsRepository
);

container.registerSingleton<IPluginsRepository>(
  "PluginsRepository",
  PluginsRepository
);
