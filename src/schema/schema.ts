import { Type } from '@sinclair/typebox';

export const updateParamsSchema = Type.Object({
  adId: Type.String(),
});

export const baseSchema = Type.Object({
  title: Type.String({ minLength: 6, maxLength: 40 }),
  description: Type.String({ minLength: 10, maxLength: 1000 }),
  price: Type.Number({ minimum: 1 }),
  currency: Type.Enum({ USD: 'USD', UAH: 'UAH' }),
  location: Type.String(),
  status: Type.Enum({ Draft: 'Draft', Public: 'Public', Archived: 'Archived' }),
});

export const baseSuccessResponseSchema = Type.Object({
  message: Type.String(),
});

export const fullResponseSchema = Type.Composite([
  baseSchema,
  Type.Object({ _id: Type.String() }),
]);

export const optionalResponseSchema = Type.Object({
  status: Type.Optional(Type.Enum({ Draft: 'Draft' })),
});
