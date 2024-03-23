import { createSpotService } from '../services/createSpot.service';
import MakeCreateSpotController from './makeCreateSpotController.factory';

const createSpotControllerFactory = new MakeCreateSpotController(
  createSpotService
);

const createSpotController = createSpotControllerFactory.handle.bind(
  createSpotControllerFactory
);

export { createSpotController };
