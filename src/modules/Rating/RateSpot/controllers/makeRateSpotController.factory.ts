import { NextFunction, Request, Response } from 'express';
import { IRateSpotService } from '../services/makeRateSpotService.factory';
import ServerError from '@shared/errors/server-error';
import { CreateRatingDTO } from '@shared/types/rating';

class MakeRateSpotController {
  constructor(private readonly rateSpotService: IRateSpotService) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId, spotId, title, comment, rate } =
        request.body as CreateRatingDTO;

      if (!userId || !spotId || !title || !comment || !rate) {
        throw new ServerError({
          message: 'Invalid data',
          statusCode: 400,
        });
      }

      const rateSpot = await this.rateSpotService({
        userId,
        spotId,
        title,
        comment,
        rate,
      });

      return response.status(201).json(rateSpot);
    } catch (err) {
      next(err);
    }
  }
}

export default MakeRateSpotController;
