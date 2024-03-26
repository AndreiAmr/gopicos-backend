import { ISpotRepository } from '@database/repositories/SpotRepository';
import { Spot } from '@prisma/client';
import ServerError from '@shared/errors/server-error';

export interface IFindAllSpotsService {
  (): Promise<Spot[]>;
}

class MakeFindAllSpotsService {
  constructor(private readonly spotsRepository: ISpotRepository) {}

  public async execute(): Promise<Spot[]> {
    const spots = await this.spotsRepository.findAll();
    const serverUrl = process.env.SERVER_URL;

    if (!serverUrl) {
      throw new ServerError({
        message: 'No server URL was found',
        statusCode: 500,
      });
    }

    const spotsWithImagesUrl = spots.map((spot) => ({
      ...spot,
    }));

    return spotsWithImagesUrl;
  }
}

export default MakeFindAllSpotsService;
