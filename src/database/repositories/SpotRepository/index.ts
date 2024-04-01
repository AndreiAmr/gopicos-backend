import { prisma } from '@database/db';
import { Spot } from '@prisma/client';
import { CreateSpotDTO, FindSpotByNameDTO } from '@shared/types/spot';

export type ISpotRepository = {
  findAll(): Promise<Spot[]>;
  findByNameAndAuthorId(dto: FindSpotByNameDTO): Promise<Spot | null>;
  create(dto: CreateSpotDTO): Promise<Spot>;
  findById(id: string): Promise<Spot | null>;
};

class SpotRepository implements ISpotRepository {
  private static instance: SpotRepository;

  public static getInstance(): SpotRepository {
    if (!this.instance) {
      this.instance = new SpotRepository();
    }

    return this.instance;
  }

  async findAll(): Promise<Spot[]> {
    return await prisma.spot.findMany({
      include: {
        Rating: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  public async findByNameAndAuthorId({
    name,
    authorId,
  }: FindSpotByNameDTO): Promise<Spot | null> {
    return await prisma.spot.findFirst({
      where: {
        name,
        authorId,
      },
    });
  }

  async create(data: CreateSpotDTO): Promise<Spot> {
    return await prisma.spot.create({
      data,
    });
  }

  async findById(id: string): Promise<Spot | null> {
    const spot = await prisma.spot.findUnique({
      where: {
        id,
      },
      include: {
        Rating: {
          include: {
            user: true,
          },
        },
        author: true,
      },
    });

    return spot || null;
  }
}

export default SpotRepository;
