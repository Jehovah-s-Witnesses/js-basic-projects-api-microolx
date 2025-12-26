import { server } from './server';
import { connectToMongoose } from './initializers/connectToMongoose';

connectToMongoose('mongodb://root:example@localhost:5001/')
  .then(() => {
    return server.listen({
      port: 4043,
    });
  })
  .then(() => {
    server.log.info('Started');
  });
