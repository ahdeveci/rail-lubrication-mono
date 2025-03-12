import { ConnectionOptions } from 'typeorm';
import { env } from '../env';

export const connectionOpts: ConnectionOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  entities: [`${__dirname}/entity/*.[tj]s`],
};
