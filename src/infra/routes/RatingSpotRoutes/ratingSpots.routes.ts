import { actualUserMiddleware } from '@infra/middlewares/actual-user.middleware';
import { requireAuth } from '@infra/middlewares/require-auth.middleware';
import { rateSpotController } from '@modules/Rating/RateSpot/controllers/rateSpot.controller';
import { validateRateSpotMiddleware } from '@modules/Rating/RateSpot/middlewares/validateRateSpot.middleware';
import { Router } from 'express';

const router = Router();

router.post(
  '/rating/create',
  actualUserMiddleware,
  requireAuth,
  validateRateSpotMiddleware,
  rateSpotController
);

export { router as ratingSpotRoutes };
