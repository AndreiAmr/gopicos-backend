import RatingRepository from '@database/repositories/RatingRepository';
import MakeRateSpot from './makeRateSpotService.factory';

const ratingRepository = RatingRepository.getInstance();
const rateSpotServicefactory = new MakeRateSpot(ratingRepository);

const rateSpotService = rateSpotServicefactory.execute.bind(
  rateSpotServicefactory
);

export { rateSpotService };
