import { ISpotRepository } from '@database/repositories/SpotRepository';
import { Rating, Spot } from '@prisma/client';
import ServerError from '@shared/errors/server-error';

export interface IFindSpotByIdService {
  (props: { spotId: string }): Promise<Spot | null>;
}

class MakeFindSpotByIdService {
  constructor(private readonly spotRepository: ISpotRepository) {}

  async execute(props: { spotId: string }): Promise<Spot | null> {
    const spot = await this.spotRepository.findById(props.spotId);

    if (!spot) {
      throw new ServerError({
        message: 'Spot not found',
        statusCode: 404,
      });
    }

    return spot;
  }
}

export default MakeFindSpotByIdService;
