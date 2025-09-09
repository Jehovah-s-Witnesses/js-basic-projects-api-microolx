import { initializeServer } from './initializers/initializeServer.js';
import { userRoute } from './routes/user/user.routes.js';
import { Type } from '@sinclair/typebox';
import { userLoginRoute } from './routes/user/userLogin.route.js';
import { verifyAuthToken } from './hooks/verifyAuthToken.js';
import { refreshSessionRoute } from './routes/session/refreshSession.route.js';
import { adRoute } from './routes/ad/ad.route.js';
import { adUpdateRoute } from './routes/ad/ad.update.route.js';
import {
  baseSuccessResponseSchema,
  baseSchema,
  updateParamsSchema,
  fullResponseSchema,
} from './schema/schema.js';
import { getAdRoute } from './routes/ad/getAd.route.js';

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
          tags: ['User'],
        },
      },
      refreshSessionRoute,
    );

    instance.register((protectedInstance, opts, done) => {
      protectedInstance.addHook('preHandler', verifyAuthToken);
      protectedInstance.post(
        '/ad',
        {
          schema: {
            body: baseSchema,
            response: {
              201: baseSuccessResponseSchema,
            },
            tags: ['Ad'],
          },
        },
        adRoute,
      );

      protectedInstance.put(
        '/ad/:ad_id',
        {
          schema: {
            params: updateParamsSchema,
            body: baseSchema,
            response: {
              201: baseSuccessResponseSchema,
            },
            tags: ['Ad'],
          },
        },
        adUpdateRoute,
      );

      protectedInstance.get(
        '/ad',
        {
          schema: {
            querystring: Type.Object({
              limit: Type.Number({ minimum: 1, maximum: 10 }),
              offset: Type.Number({ minimum: 0 }),
              status: Type.Optional(Type.Enum({ Draft: 'Draft' })),
            }),
            response: {
              200: Type.Object({
                count: Type.Number(),
                items: Type.Array(fullResponseSchema),
              }),
            },
            tags: ['Ad'],
          },
        },
        getAdRoute,
      );
      done();
    });
    done();
  },
  {
    prefix: '/api/v1',
  },
);
