// Email Routes
// Handles contact and partnership email submissions via AWS SES

import { Router } from 'express'
import { sendEmailController } from '../controllers/emailController.js'

export const emailRouter = Router()

// POST /api/send-email
emailRouter.post('/', sendEmailController)

