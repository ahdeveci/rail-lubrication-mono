import { str, num, bool, cleanEnv } from 'envalid';

export const env = cleanEnv(process.env, {
  PORT: num({ desc: 'Application port' }),
  DB_HOST: str({ desc: 'Database host' }),
  DB_PORT: num({ desc: 'Database port' }),
  DB_USERNAME: str({ desc: 'Username of Database user' }),
  DB_PASSWORD: str({ desc: 'Password for Database user' }),
  DB_NAME: str({ desc: 'Name of the database' }),
  CLIENT_BASE_URL: str({
    desc: 'URL of client application',
    default: 'http://localhost:4200',
  }),
});
