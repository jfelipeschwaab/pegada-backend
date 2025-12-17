import express from 'express'
import * as MissionController from '../controllers/mission.controller.js';

const router = express.Router();

router.get('/listMissions', MissionController.getMissions);
router.post('/createMission', MissionController.postMission);
router.post('/completeMission', MissionController.postCompleteMission);

export default router;