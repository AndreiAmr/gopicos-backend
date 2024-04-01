import { rateSpotController } from '@modules/Rating/RateSpot/controllers/rateSpot.controller';
import { validateRateSpotMiddleware } from '@modules/Rating/RateSpot/middlewares/validateRateSpot.middleware';
import { Router } from 'express';

const router = Router();

router.post('/rating/create', validateRateSpotMiddleware, rateSpotController);

export { router as ratingSpotRoutes };
