import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = process.env.NODE_ENV === 'production' ? 'localhost' : 'database';
  createConnection({
    ...options,
  });
});

