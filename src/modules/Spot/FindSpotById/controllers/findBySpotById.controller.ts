import { findSpotByIdService } from '../services/findSpotById.service';
import MakeFindSpotByIdController from './makeFindSpotByIdController.factory';

const findSpotByIdControllerFactory = new MakeFindSpotByIdController(
  findSpotByIdService
);

const findSpotByIdController = findSpotByIdControllerFactory.handle.bind(
  findSpotByIdControllerFactory
);

export { findSpotByIdController };
