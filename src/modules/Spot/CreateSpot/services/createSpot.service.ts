import SpotRepository from '@database/repositories/SpotRepository';
import MakeCreateSpotService from './makeCreateSpotService.factory';

const spotRepository = SpotRepository.getInstance();

const createSpotServiceFactory = new MakeCreateSpotService(spotRepository);

const createSpotService = createSpotServiceFactory.execute.bind(
  createSpotServiceFactory
);

export { createSpotService };
