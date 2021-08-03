import "dotenv/config";
import "reflect-metadata";
import "@database/typeorm";
import "@repositories/index";

import {client} from './client';

client.login(process.env.DISC_TOKEN);


