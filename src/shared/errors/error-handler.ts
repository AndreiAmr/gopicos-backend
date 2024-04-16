import { NextFunction, Request, Response } from 'express';
import ServerError from './server-error';

const errorHandler = (
  error: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('POR QUE N TO CAINDO AQUI ?');
  if (error instanceof ServerError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof Error) {
    return res.status(500).json({ error: error.message });
  }

  next(error);
};

export { errorHandler };
