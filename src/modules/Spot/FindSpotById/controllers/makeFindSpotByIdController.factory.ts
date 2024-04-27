import { NextFunction, Request, Response } from 'express';
import { IFindSpotByIdService } from '../services/makeFindSpotByIdService.factory';
import ServerError from '@shared/errors/server-error';

class MakeFindSpotByIdController {
  constructor(private readonly findSpotByIdService: IFindSpotByIdService) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      if (!id) {
        throw new ServerError({
          message: 'You must pass the spot id',
          statusCode: 400,
        });
      }

      const spot = await this.findSpotByIdService({
        spotId: id as string,
      });

      response.status(200).json({ spot });
    } catch (err) {
      next(err);
    }
  }
}

export default MakeFindSpotByIdController;
