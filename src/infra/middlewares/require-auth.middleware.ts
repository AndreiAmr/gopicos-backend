import ServerError from '@shared/errors/server-error';
import { NextFunction, Request, Response } from 'express';

export const requireAuth = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    if (!request.actualUser)
      throw new ServerError({
        statusCode: 401,
        message: 'Unauthorized',
      });

    next();
  } catch (err) {
    next(err);
  }
};
