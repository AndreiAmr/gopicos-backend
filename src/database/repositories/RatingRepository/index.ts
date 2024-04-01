import { prisma } from '@database/db';
import { Rating } from '@prisma/client';
import { CreateRatingDTO, FindRateExistingDTO } from '@shared/types/rating';

export interface IRatingRepository {
  create(props: CreateRatingDTO): Promise<Rating | null>;
  findRatingBySpotId(props: { spotId: string }): Promise<Rating[] | null>;
  findRateByUserIdTitleCommentAndSpotId(
    props: FindRateExistingDTO
  ): Promise<Rating | null>;
}

class RatingRepository implements IRatingRepository {
  private static instance: RatingRepository;

  constructor() {}

  public static getInstance(): RatingRepository {
    if (!this.instance) {
      this.instance = new RatingRepository();
    }

    return this.instance;
  }

  async create({
    userId,
    spotId,
    comment,
    rate,
    title,
  }: CreateRatingDTO): Promise<Rating | null> {
    const rating = await prisma.rating.create({
      data: {
        title,
        comment,
        rate,
        userId,
        spotId,
      },
    });
    return rating || null;
  }

  async findRatingBySpotId({
    spotId,
  }: {
    spotId: string;
  }): Promise<Rating[] | null> {
    const ratings = await prisma.rating.findMany({
      where: {
        spotId: spotId,
      },
    });

    return ratings || null;
  }

  async findRateByUserIdTitleCommentAndSpotId({
    userId,
    spotId,
    title,
    comment,
  }: FindRateExistingDTO): Promise<Rating | null> {
    const rating = await prisma.rating.findFirst({
      where: {
        userId,
        spotId,
        title,
        comment,
      },
    });

    return rating || null;
  }
}

export default RatingRepository;
