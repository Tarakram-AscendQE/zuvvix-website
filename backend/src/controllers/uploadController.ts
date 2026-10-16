// Image Upload Controller
// Handles file uploads to GoDaddy uploads directory (/public_html/zuvvix.com/uploads/blogs) or local fallback

import { Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { config } from '../config/index.js'

// Ensure destination folder exists
function ensureUploadDir(): void {
  try {
    if (!fs.existsSync(config.uploadDir)) {
      fs.mkdirSync(config.uploadDir, { recursive: true })
    }
  } catch (err) {
    console.error('[Upload] Error creating upload directory:', err)
  }
}

// Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadDir()
    cb(null, config.uploadDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.png'
    const safeName = path.basename(file.originalname, ext).replace(/[^\w-]/g, '')
    const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    cb(null, `blog_${uniqueSuffix}_${safeName}${ext}`)
  },
})

// File filter for images only
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = /jpeg|jpg|png|webp|gif|svg/i
  const isExt = allowed.test(path.extname(file.originalname).toLowerCase())
  const isMime = allowed.test(file.mimetype)

  if (isExt && isMime) {
    cb(null, true)
  } else {
    cb(new Error('Only image files (JPEG, PNG, WebP, GIF, SVG) are allowed.'))
  }
}

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
})

// HTTP POST /api/upload
export async function uploadImage(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No image file uploaded.',
        timestamp: Date.now(),
      })
      return
    }

    const publicUrl = `${config.uploadBaseUrl}/${req.file.filename}`

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully.',
      filename: req.file.filename,
      url: publicUrl,
      size: req.file.size,
      mimetype: req.file.mimetype,
      timestamp: Date.now(),
    })
  } catch (err: any) {
    console.error('[Upload Error]', err)
    res.status(500).json({
      success: false,
      message: err.message || 'Image upload failed.',
      timestamp: Date.now(),
    })
  }
}

// HTTP POST /api/upload/base64 (Uploads base64 data and writes image file to folder)
export async function uploadBase64Image(req: Request, res: Response): Promise<void> {
  try {
    const { base64Data, filename } = req.body || {}
    if (!base64Data || typeof base64Data !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Valid base64Data string is required.',
        timestamp: Date.now(),
      })
      return
    }

    ensureUploadDir()

    // Extract base64 payload and extension
    const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    let extension = '.png'
    let buffer: Buffer

    if (matches && matches.length === 3) {
      const mime = matches[1]
      const extMatch = mime.split('/')[1]
      if (extMatch) extension = `.${extMatch.replace('jpeg', 'jpg')}`
      buffer = Buffer.from(matches[2], 'base64')
    } else {
      buffer = Buffer.from(base64Data, 'base64')
    }

    const uniqueName = `blog_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${extension}`
    const filePath = path.join(config.uploadDir, uniqueName)

    await fs.promises.writeFile(filePath, buffer)
    const publicUrl = `${config.uploadBaseUrl}/${uniqueName}`

    res.status(200).json({
      success: true,
      message: 'Base64 image saved successfully.',
      filename: uniqueName,
      url: publicUrl,
      timestamp: Date.now(),
    })
  } catch (err: any) {
    console.error('[Upload Base64 Error]', err)
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to save base64 image.',
      timestamp: Date.now(),
    })
  }
}

