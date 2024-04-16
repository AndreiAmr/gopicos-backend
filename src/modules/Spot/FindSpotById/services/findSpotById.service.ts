import SpotRepository from '@database/repositories/SpotRepository';
import MakeFindSpotByIdService from './makeFindSpotByIdService.factory';

const spotRepository = SpotRepository.getInstance();

const findSpotByIdServiceFactory = new MakeFindSpotByIdService(spotRepository);

const findSpotByIdService = findSpotByIdServiceFactory.execute.bind(
  findSpotByIdServiceFactory
);

export { findSpotByIdService };
