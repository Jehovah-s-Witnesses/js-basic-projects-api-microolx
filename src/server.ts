import { initializeServer } from './initializers/initializeServer';
import { userRoute } from './routes/user/user.routes';
import { Type } from '@sinclair/typebox';
import { userLoginRoute } from './routes/user/userLogin.route';
import { verifyAuthToken } from './hooks/verifyAuthToken';
import { refreshSessionRoute } from './routes/session/refreshSession.route';
import { adRoute } from './routes/ad/ad.route';
import { adUpdateRoute } from './routes/ad/ad.update.route';
import {
  baseSuccessResponseSchema,
  baseSchema,
  updateParamsSchema,
  fullResponseSchema,
} from './schema/schema';
import { getAdRoute } from './routes/ad/getAd.route';
import { applyAdRoute } from './routes/ad/applyAd.route';
import { createFavoriteRoute } from './routes/favorite/createFavorite.route';
import { deleteFavoriteRoute } from './routes/favorite/deleteFavorite.route';
import { getFavoritesRoute } from './routes/favorite/getFavorites.route';

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
        '/ad/:adId',
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
              status: Type.Optional(
                Type.Enum({
                  Draft: 'Draft',
                  Public: 'Public',
                  Archived: 'Archived',
                }),
              ),
              titleQuery: Type.Optional(
                Type.String({ minLength: 2, maxLength: 40 }),
              ),
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

      protectedInstance.patch(
        '/ad/:adId',
        {
          schema: {
            params: updateParamsSchema,
            response: {
              400: Type.Object({ message: Type.String() }),
            },
            tags: ['Ad'],
          },
        },
        applyAdRoute,
      );

      protectedInstance.post(
        '/favorite',
        {
          schema: {
            body: Type.Object({ adId: Type.String() }),
            response: {
              400: Type.Object({ message: Type.String() }),
            },
            tags: ['Favorite'],
          },
        },
        createFavoriteRoute,
      );

      protectedInstance.delete(
        '/favorite/:favoriteId',
        {
          schema: {
            params: Type.Object({ favoriteId: Type.String() }),
            response: {
              400: Type.Object({ message: Type.String() }),
            },
            tags: ['Favorite'],
          },
        },
        deleteFavoriteRoute,
      );

      protectedInstance.get(
        '/favorite',
        {
          schema: {
            querystring: Type.Object({
              limit: Type.Number({ minimum: 1, maximum: 5 }),
              offset: Type.Number({ minimum: 0 }),
            }),
            response: {
              200: Type.Object({
                count: Type.Number(),
                items: Type.Array(fullResponseSchema),
              }),
            },
            tags: ['Favorite'],
          },
        },
        getFavoritesRoute,
      );
      done();
    });
    done();
  },
  {
    prefix: '/api/v1',
  },
);
