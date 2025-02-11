import server from './shared/server';
import router from './routes';
import env from './config/env';
import middleware from './shared/server/middlewares';
import * as sourceMapSupport from 'source-map-support';
import providers from './config/providers';

sourceMapSupport.install();
process.on('unhandledRejection', console.log);

const mongoConn = providers.connection;

middleware.initMiddlewares();
router.initRoutes();
middleware.initExceptionMiddlewares();

server.listen(env.server_port, async () => {
  await mongoConn.connect();
  console.log(`Opening the gates in ${env.server_port}`);
});

process.on('SIGINT', () => {
  mongoConn.disconnect();
  process.exit(1);
});
