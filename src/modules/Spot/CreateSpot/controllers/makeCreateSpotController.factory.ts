import { CreateSpotControllerDTO, CreateSpotDTO } from '@shared/types/spot';
import { NextFunction, Request, Response } from 'express';
import { ICreateSpotService } from '../services/makeCreateSpotService.factory';
import ServerError from '@shared/errors/server-error';

class MakeCreateSpotController {
  constructor(private readonly createSpotService: ICreateSpotService) {}

  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const images = new Array(request.files)
        .flatMap((item: any) => item)
        .map((item) => item.filename);

      if (!images.length) {
        throw new ServerError({
          message: 'You must upload at least one image',
          statusCode: 400,
        });
      }

      const spotDTO = request.body as CreateSpotControllerDTO;

      if (!spotDTO.name || !spotDTO.authorId) {
        new Error('You must pass the name and authorId of the spot');
      }

      const spotTransformed: CreateSpotDTO = {
        ...spotDTO,
        isPaid: spotDTO.isPaid === 'true',
        hasRoof: spotDTO.hasRoof === 'true',
        entryAmount: spotDTO.entryAmount
          ? Number(spotDTO.entryAmount)
          : undefined,
        longitude: Number(spotDTO.longitude),
        latitude: Number(spotDTO.latitude),
        images,
      };

      const spot = await this.createSpotService(spotTransformed);

      response.status(201).json(spot);
    } catch (error) {
      next(error);
    }
  }
}

export default MakeCreateSpotController;
