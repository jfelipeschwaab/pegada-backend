import express from 'express'
import * as touristicPointsController from '../controllers/touristicPoints.controller.js';

const router = express.Router();

router.get('/listTouristicPoints', touristicPointsController.getTouristicPoints);
router.post('/createTouristicPoint', touristicPointsController.postTouristicPoint);

export default router;