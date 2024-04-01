import { rateSpotService } from '../services/rateSpot.service';
import MakeRateSpotController from './makeRateSpotController.factory';

const rateSpotControllerFactory = new MakeRateSpotController(rateSpotService);

const rateSpotController = rateSpotControllerFactory.handle.bind(
  rateSpotControllerFactory
);

export { rateSpotController };
