import SpotRepository from '@database/repositories/SpotRepository';
import MakeFindAllSpotsService from './makeFindAllSpotsService.factory';

const spotRepository = SpotRepository.getInstance();

const findAllSpotsServiceFactory = new MakeFindAllSpotsService(spotRepository);

const findAllSpotsService = findAllSpotsServiceFactory.execute.bind(
  findAllSpotsServiceFactory
);

export { findAllSpotsService };
