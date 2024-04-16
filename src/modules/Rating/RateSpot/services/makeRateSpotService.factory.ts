import { IRatingRepository } from '@database/repositories/RatingRepository';
import { Rating } from '@prisma/client';
import ServerError from '@shared/errors/server-error';
import { CreateRatingDTO } from '@shared/types/rating';

export interface IRateSpotService {
  ({ userId, spotId, title, comment, rate }: CreateRatingDTO): Promise<Rating>;
}

class MakeRateSpot {
  constructor(private readonly ratingRepository: IRatingRepository) {}

  async execute(dto: CreateRatingDTO): Promise<Rating> {
    const alreadyCommented =
      await this.ratingRepository.findRateByUserIdTitleCommentAndSpotId(dto);

    if (alreadyCommented) {
      throw new ServerError({
        message: 'You already commented this on this spot',
        statusCode: 400,
      });
    }

    const rateCreated = await this.ratingRepository.create(dto);

    if (!rateCreated) {
      throw new ServerError({
        message: 'There was an error creating rate',
        statusCode: 500,
      });
    }

    return rateCreated;
  }
}

export default MakeRateSpot;
