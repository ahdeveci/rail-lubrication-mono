import 'reflect-metadata';
import koa from 'koa';
import {
  useContainer,
  useKoaServer,
  RoutingControllersOptions,
} from 'routing-controllers';
import { Container } from 'typedi';
import AppDataSource from './database/database.service';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const routingOptions: RoutingControllersOptions = {
  routePrefix: '/api',
  controllers: [`${__dirname}/controllers/**/*.controller.[tj]s`],
  middlewares: [`${__dirname}/middlewares/**.[tj]s`],
  defaultErrorHandler: false,
};

const app = new koa();

useContainer(Container);
useKoaServer(app, routingOptions);

const startServer = () => {
  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
};

(async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log('db connection success...');
      startServer();
    })
    .catch((err) => {
      console.log('error=>', err);
      throw err;
    });
})();
