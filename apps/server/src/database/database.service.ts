import { DataSource } from 'typeorm';

import { connectionOpts } from './config';

const connection = new DataSource(connectionOpts);

export default connection;
