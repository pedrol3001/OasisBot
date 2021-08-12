import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { ormconfig } from '../../../../config/ormconfig';

async function ConnectDb(): Promise<Connection> {
  return createConnection(
    Object.assign(ormconfig, {
      database: process.env.NODE_ENV === 'test' ? 'oasis_test' : ormconfig.database,
    }),
  );
}

export { ConnectDb };
