

const type = process.env.TYPEORM_TYPE || 'postgres';
const username = process.env.TYPEORM_USERNAME || 'docker';
const password = process.env.TYPEORM_PASSWORD || 'password';
const host = process.env.TYPEORM_HOST || '127.0.0.1';
const port = parseInt(process.env.TYPEORM_PORT, 10) || 5432;
const database = process.env.TYPEORM_DATABASE || 'dreams';
const env = process.env.NODE_ENV || 'dev';

const ormconfig = {

  type: "postgres",

  ssl: env === 'production' ? {
    "rejectUnauthorized": false
  } : undefined,

  url: process.env.DATABASE_URL || `${type}://${username}:${password}@${host}:${port}/${database}`,

  entities: [
    `${env === 'production' ? './dist' :'./src'}/repositories/**/entities/*{.ts,.js}`
  ],
  migrations: [
    `${env === 'production' ? './dist' :'./src'}/database/migrations/*{.ts,.js}`
  ],
  cli: {
    migrationsDir: `${env === 'production' ? './dist' :'./src'}/database/migrations`
  },
  synchronize: true,
};


module.exports = ormconfig;
