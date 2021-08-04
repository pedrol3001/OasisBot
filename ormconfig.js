

const type = process.env.TYPEORM_TYPE || 'postgres';
const username = process.env.TYPEORM_USERNAME || 'docker';
const password = process.env.TYPEORM_PASSWORD || 'password';
const host = process.env.TYPEORM_HOST || '127.0.0.1';
const port = parseInt(process.env.TYPEORM_PORT, 10) || 5432;
const database = process.env.TYPEORM_DATABASE || 'dreams';
const env = process.env.NODE_ENV || 'development';

const ormconfig = {

  type: "postgres",

  host: env !== 'production' ? host : undefined,
  port: env !== 'production' ? port : undefined,
  username: env !== 'production' ? username : undefined,
  password: env !== 'production' ? password : undefined,
  database: env !== 'production' ? database : undefined,

  extra: {
    ssl: env === 'production'
  },

  url: env === 'production'
    ? (process.env.DATABASE_URL || `${type}://${username}:${password}@${host}:${port}/${database}`)
    : undefined,

  entities: [
    `./${env === 'production' ? 'dist' :'src'}/repositories/**/entities/*.ts`
  ],
  migrations: [
    `./${env === 'production' ? 'dist' :'src'}/database/migrations/*.ts`
  ],
  cli: {
    migrationsDir: `./${env === 'production' ? 'dist' :'src'}/database/migrations`
  },
  synchronize: true,
};


module.exports = ormconfig;
