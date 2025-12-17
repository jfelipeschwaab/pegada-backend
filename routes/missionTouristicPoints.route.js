import express from 'express'
import * as missionTouristicPoint from '../controllers/missionTouristicPoints.controller.js';

const router = express.Router();

router.get('/listMissionTouristicPoints', missionTouristicPoint.getMissionTouristicPoints);
router.post('/createMissionTouristicPoint', missionTouristicPoint.postMissionTouristicPoint);

export default router;