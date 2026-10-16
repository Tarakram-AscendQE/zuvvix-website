// Upload Routes
// Endpoints for saving blog images to GoDaddy upload directory

import { Router } from 'express'
import {
  uploadMiddleware,
  uploadImage,
  uploadBase64Image,
} from '../controllers/uploadController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

export const uploadRouter = Router()

// Multipart form file upload (name='image' or 'file')
uploadRouter.post('/', requireAuth, uploadMiddleware.single('image'), uploadImage)

// Base64 image payload upload
uploadRouter.post('/base64', requireAuth, uploadBase64Image)

