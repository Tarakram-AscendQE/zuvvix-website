// Auth Routes

import { Router } from 'express'
import { login, logout, getMe } from '../controllers/authController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

export const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/me', requireAuth, getMe)

