import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';
import fs from 'fs';
import { Server } from 'http';
import ServerError from '@shared/errors/server-error';

const createSpotSchema = z.object({
  authorId: z.string().uuid(),
  name: z.string().min(6).max(60),
  description: z.string().min(12).max(255),
  hasRoof: z.string(),
  isPaid: z.string(),
  entryAmount: z.string().optional(),
  longitude: z.string(),
  latitude: z.string(),
});

export const validateCreateSpotMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    createSpotSchema.parse(request.body);
    next();
  } catch (err: any) {
    if (request.files) {
      const images = new Array(request.files).flatMap((item: any) => item);

      for (const image of images) {
        fs.unlinkSync(image.path);
      }
    }
    response.status(400).json({ error: err.errors });
  }
};
