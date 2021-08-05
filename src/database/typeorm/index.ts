
import { Connection, createConnection, getConnectionOptions } from "typeorm";

async function ConnectDb() : Promise<Connection> {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "production" ? "localhost" : "database",
      database:
        process.env.NODE_ENV === "test"
          ? "dream_test"
          : defaultOptions.database,
    })
  );
};

export { ConnectDb };
