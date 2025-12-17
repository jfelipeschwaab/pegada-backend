import express from 'express'
import * as ProfileController from '../controllers/profile.controller.js';

const router = express.Router();

router.post('/postPoints', ProfileController.postPoints);

export default router;