import express from 'express'
import * as StoreController from '../controllers/store.controller.js';

const router = express.Router();

router.post('/createStore', StoreController.postStore);
router.get('/listStores', StoreController.getStores);
router.post('/listStore/:cnpj', StoreController.getStoreByCNPJ);

export default router;