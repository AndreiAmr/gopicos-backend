import { findAllSpotsService } from '../services/findAllSpots.service';
import MakeFindAllSpotsController from './makeFindAllSpotsController.factory';

const findAllSpotsControllerFactory = new MakeFindAllSpotsController(
  findAllSpotsService
);

const findAllSpotsController = findAllSpotsControllerFactory.execute.bind(
  findAllSpotsControllerFactory
);

export { findAllSpotsController };
