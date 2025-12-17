import express from 'express'
import * as cuponRedeemedController from '../controllers/cuponRedeemed.controller.js';

const router = express.Router();

router.get('/listCuponRedeemed/:user_id', cuponRedeemedController.getCuponsRedeemedByUser);
router.post('/createCuponRedeemed', cuponRedeemedController.postRedeemCupon);

export default router;