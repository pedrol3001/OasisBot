import { container } from 'tsyringe';

import { GuildsRepository } from '@guild/infra/typeorm/repository/GuildsRepository';
import { IGuildsRepository } from '@guild/infra/typeorm/repository/IGuildsRepository';
import { IPluginsRepository } from '@plugin/infra/typeorm/repository/IPluginsRepository';
import { PluginsRepository } from '@plugin/infra/typeorm/repository/PluginsRepository';

container.registerSingleton<IGuildsRepository>('GuildsRepository', GuildsRepository);
container.registerSingleton<IPluginsRepository>('PluginsRepository', PluginsRepository);
