import 'dotenv/config';
import 'reflect-metadata';
import '@config/enviroment';
import '@repositories/index';
import { client } from './client';
import { ConnectDb } from '@database/typeorm';

ConnectDb()
  .then((connection) => {
    console.log('Connected to database: ', connection.isConnected);
    client.login(process.env.DISC_TOKEN);
  })
  .catch((err) => {
    console.error(err);
  });
