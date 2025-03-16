import 'reflect-metadata';
import koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import {
  useContainer,
  useKoaServer,
  RoutingControllersOptions,
} from 'routing-controllers';
import { Container } from 'typedi';
import { initializeDatabase } from './database/database.service';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const routingOptions: RoutingControllersOptions = {
  routePrefix: '/api',
  controllers: [`${__dirname}/controllers/**/*.controller.[tj]s`],
  middlewares: [`${__dirname}/middlewares/**.[tj]s`],
  defaultErrorHandler: false,
};

const app = new koa();

// Set up Koa with routing-controllers
useKoaServer(app, routingOptions);

// Set up TypeDI container
useContainer(Container);

app.use(cors());
app.use(bodyParser());

const bootstrap = async () => {
  try {
    // Initialize database
    await initializeDatabase();

    // Set up Koa with routing-controllers
    useKoaServer(app, routingOptions);

    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

bootstrap().catch(console.error);
