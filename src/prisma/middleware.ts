import { Prisma } from '@prisma/client';

export function SoftDeleteMiddleware<T>(): Prisma.Middleware {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<T>,
  ): Promise<T> => {
    const whiteList: Prisma.ModelName[] = [Prisma.ModelName.PushToken];

    if (whiteList.includes(params.model)) {
      // Ignore queries for models in the white list
      return next(params);
    }
    if (params.action === 'delete') {
      // Delete queries
      // Change action to an update
      params.action = 'update';
      params.args['data'] = {
        deletedAt: new Date(),
      };
    }
    if (params.action === 'deleteMany') {
      // Delete many queries
      params.action = 'updateMany';
      params.args['data'] = {
        deletedAt: new Date(),
      };
    }
    return next(params);
  };
}
