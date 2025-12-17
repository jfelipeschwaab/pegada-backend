import express from 'express';

import storeRoute from '../routes/store.route.js';
import missionRoute from '../routes/mission.route.js';
import cuponRoute from '../routes/cupon.route.js';  
import cuponRedeemedRoute from '../routes/cuponRedeemed.route.js';
import touristicPointsRoute from '../routes/touristicPoints.route.js';
import missionTouristicPointsRoute from '../routes/missionTouristicPoints.route.js';

const router = express.Router();

// router.use('/store', storeRoute);
// router.use('/mission', missionRoute);
// router.use('/cupon', cuponRoute);
// router.use('/cuponRedeemed', cuponRedeemedRoute);  
// router.use('/touristicPoints', touristicPointsRoute);
// router.use('/missionTouristicPoints', missionTouristicPointsRoute);

export default router;