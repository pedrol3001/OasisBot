import 'dotenv/config';
import 'reflect-metadata';
import '@config/enviroment';
import '@repositories/index';
import { ConnectDb } from '@database/typeorm';

import { client } from './client';

ConnectDb()
  .then((connection) => {
    console.log('Connected to database: ', connection.isConnected);
    client.login(process.env.DISC_TOKEN);
  })
  .catch((err) => {
    console.error(err);
  });
