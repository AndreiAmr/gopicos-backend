import { actualUserMiddleware } from '@infra/middlewares/actual-user.middleware';
import { requireAuth } from '@infra/middlewares/require-auth.middleware';
import { createSpotController } from '@modules/Spot/CreateSpot/controllers/createSpotController';
import { validateCreateSpotMiddleware } from '@modules/Spot/CreateSpot/middlewares/validate-create-spot.middleware';
import { findAllSpotsController } from '@modules/Spot/FindAll/controllers/findAllSpots.controller';
import { findSpotByIdController } from '@modules/Spot/FindSpotById/controllers/findBySpotById.controller';
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
  actualUserMiddleware,
  requireAuth,
  validateCreateSpotMiddleware,
  createSpotController
);

routes.get(
  spotsURLs.list,
  actualUserMiddleware,
  requireAuth,
  findAllSpotsController
);
routes.get(
  spotsURLs.findById,
  actualUserMiddleware,
  requireAuth,
  findSpotByIdController
);

export { routes as spotsRoutes };
