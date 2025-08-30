import { initializeServer } from './initializers/initializeServer.js';
import { userRoute } from './routes/user.routes.js';
import { Type } from '@sinclair/typebox';
import { userLoginRoute } from './routes/userLogin.route.js';
import { verifyAuthToken } from './hooks/verifyAuthToken.js';
import { refreshSessionRoute } from './routes/refreshSession.route.js';

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
    instance.post(
      '/login',
      {
        schema: {
          body: Type.Object({
            username: Type.String({ minLength: 4, maxLength: 30 }),
            password: Type.String({ minLength: 8, maxLength: 30 }),
          }),
          response: {
            400: Type.Object({ message: Type.String() }),
            201: Type.Object({
              message: Type.String(),
              accessToken: Type.String(),
              refreshToken: Type.String(),
            }),
          },
          tags: ['User'],
        },
      },
      userLoginRoute,
    );

    instance.patch(
      '/refresh',
      {
        schema: {
          body: Type.Object({
            refreshToken: Type.String(),
          }),
          response: {
            400: Type.Object({ message: Type.String() }),
            200: Type.Object({
              accessToken: Type.String(),
              refreshToken: Type.String(),
              message: Type.String(),
            }),
          },
        },
      },
      refreshSessionRoute,
    );

    instance.register((protectedInstance, opts, done) => {
      protectedInstance.addHook('preHandler', verifyAuthToken);
      done();
    });
    done();
  },
  {
    prefix: '/api/v1',
  },
);
