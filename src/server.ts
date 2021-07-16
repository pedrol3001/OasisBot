import "dotenv/config";
import "reflect-metadata";
import "@shared/container";
import "@database/typeorm";

import {client} from './client';
client.login(process.env.DISC_TOKEN);
