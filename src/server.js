import { initializeServer } from './initializers/initializeServer.js';
import { userRoute } from './routes/user.routes.js';
import { Type } from '@sinclair/typebox';

export const server = await initializeServer();

server.route({
  url: '/',
  handler() {
    return 'hello';
  },
  method: 'GET',
});

server.register(
  (instance, opts, done) => {
    instance.post(
      '/register',
      {
        schema: {
          body: Type.Object({
            username: Type.String({ minLength: 4, maxLength: 30 }),
            email: Type.String({
              minLength: 6,
              maxLength: 40,
              format: 'email',
            }),
            password: Type.String({ minLength: 8, maxLength: 30 }),
          }),
          response: {
            400: Type.Object({ message: Type.String() }),
            201: Type.Object({ message: Type.String() }),
          },
          tags: ['User'],
        },
      },
      userRoute,
    );
    done();
  },
  {
    prefix: '/api/v1',
  },
);
