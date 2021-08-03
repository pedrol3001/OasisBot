import { container } from "tsyringe";
import {GuildsRepository} from "@repositories/guild/repository/GuildsRepository"
import { IGuildsRepository } from "@repositories/guild/repository/IGuildsRepository";
import { IPluginsRepository } from "./plugin/repository/IPluginsRepository";
import { PluginsRepository } from "./plugin/repository/PluginsRepository";

container.registerSingleton<IGuildsRepository>(
  "GuildsRepository",
  GuildsRepository
);

container.registerSingleton<IPluginsRepository>(
  "PluginsRepository",
  PluginsRepository
);
