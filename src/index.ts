// import * as Hapi from '@hapi/hapi';
// import CatboxRedis from '@hapi/catbox-redis';
const Hapi = require('@hapi/hapi');
const CatboxRedis = require('@hapi/catbox-redis');

console.log(`Running environment ${process.env.NODE_ENV || 'dev'}`);

// Catch uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandled rejected promises
process.on('unhandledRejection', (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
  console.error({ reason });
});

const init = async () => {
  const server = new Hapi.server({
    host: 'localhost',
    port: 8000,
    cache: {
      name: 'redis-cache',
      provider: {
        constructor: CatboxRedis,
        options: {
          partition: 'my_cached_data',
          // tls: {},
        },
      },
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
