import { Request, Response } from 'express';
import { IFindAllSpotsService } from '../services/makeFindAllSpotsService.factory';
import ServerError from '@shared/errors/server-error';

class MakeFindAllSpotsController {
  constructor(private readonly findAllSpotsService: IFindAllSpotsService) {}

  public async execute(request: Request, response: Response) {
    const spots = await this.findAllSpotsService();

    if (!spots) {
      throw new ServerError({
        message: 'There was an error while trying to find all spots',
        statusCode: 500,
      });
    }

    return response.status(200).json(spots);
  }
}

export default MakeFindAllSpotsController;
