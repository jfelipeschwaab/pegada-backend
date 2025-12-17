import express from 'express'
import * as CuponController from '../controllers/cupon.controller.js';

const router = express.Router();

router.get('/listCupons', CuponController.getCupons);
router.post('/createCupon', CuponController.postCupon);

export default router;