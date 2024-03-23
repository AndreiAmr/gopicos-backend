import { ISpotRepository } from '@database/repositories/SpotRepository';
import { Spot } from '@prisma/client';
import ServerError from '@shared/errors/server-error';
import { CreateSpotDTO } from '@shared/types/spot';

export type ICreateSpotService = (spotDTO: CreateSpotDTO) => Promise<Spot>;

class MakeCreateSpotService {
  constructor(private readonly spotRepository: ISpotRepository) {}

  public async execute(spotDTO: CreateSpotDTO) {
    const nameAlreadyRegistered =
      await this.spotRepository.findByNameAndAuthorId({
        name: spotDTO.name,
        authorId: spotDTO.authorId,
      });

    if (nameAlreadyRegistered) {
      throw new ServerError({
        message: 'Spot name already registered',
        statusCode: 401,
      });
    }

    const spot = await this.spotRepository.create(spotDTO);

    if (!spot) {
      throw new ServerError({
        message: 'There was an error creating the spot',
        statusCode: 500,
      });
    }

    return spot;
  }
}

export default MakeCreateSpotService;
