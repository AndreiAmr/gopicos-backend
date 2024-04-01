import ServerError from '@shared/errors/server-error';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const rateSpotSchema = z.object({
  userId: z.string().min(1),
  spotId: z.string().min(1),
  title: z.string().min(1),
  comment: z.string().min(1),
  rate: z.number().min(1).max(5),
});

const validateRateSpotMiddleware = (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  rateSpotSchema.parse(request.body);
  return next();
};

export { validateRateSpotMiddleware };
