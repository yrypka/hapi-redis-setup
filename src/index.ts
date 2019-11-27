import * as hapi from '@hapi/hapi';

console.log(`Running environment ${process.env.NODE_ENV || 'dev'}`);

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});

const init = async () => {
  const server = new hapi.Server({
    host: 'localhost',
    port: 8000,
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
