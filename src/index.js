import { server } from './server.js';
import { connectToMongoose } from './initializers/connectToMongoose.js';

connectToMongoose('mongodb://root:example@localhost:5001/')
  .then(() => {
    return server.listen({
      port: 4043,
    });
  })
  .then(() => {
    server.log.info('Started');
  });
