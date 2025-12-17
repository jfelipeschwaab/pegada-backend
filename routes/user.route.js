import express from 'express'
import * as userController from '../controllers/user.controller.js'

const router = express.Router()

// Ranking
router.get('/listUsersRanking', userController.getUsersRanking)

// Perfil
router.get('/getUserProfile/:userId', userController.getUserProfile)

// Atualizar nome do usuário
router.put('/updateUserName/:userId', userController.updateUserName)

export default router
