import { createSpotController } from '@modules/Spot/CreateSpot/controllers/createSpotController';
import { validateCreateSpotMiddleware } from '@modules/Spot/CreateSpot/middlewares/validate-create-spot.middleware';
import { findAllSpotsController } from '@modules/Spot/FindAll/controllers/findAllSpots.controller';
import { spotsURLs } from '@shared/utils/routes-urls';
import { Router } from 'express';
import multer from 'multer';

const routes = Router();

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, `uploads/picos/`);
  },
  filename: function (_, file, cb) {
    const now = new Date();

    cb(null, `${now.toISOString()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

routes.post(
  spotsURLs.create,
  upload.array('image'),
  validateCreateSpotMiddleware,
  createSpotController
);

routes.get(spotsURLs.list, findAllSpotsController);

export { routes as spotsRoutes };
