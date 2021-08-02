import "dotenv/config";
import "reflect-metadata";
import "@database/typeorm";
import "@repositories/index";

import { ShardingManager } from "discord.js"

const manager = new ShardingManager('./cient.ts', {
    totalShards: 'auto',
    token: process.env.DISC_TOKEN
});

// Emitted when a shard is created
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));

// Spawn your shards
manager.spawn();
