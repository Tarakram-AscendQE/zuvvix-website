// Central API Router

import { Router } from 'express'
import { authRouter } from './authRoutes.js'
import { blogRouter } from './blogRoutes.js'
import { uploadRouter } from './uploadRoutes.js'
import { emailRouter } from './emailRoutes.js'

export const apiRouter = Router()

// Health check
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: Date.now(),
  })
})

// Feature routes
apiRouter.use('/auth', authRouter)
apiRouter.use('/blogs', blogRouter)
apiRouter.use('/articles', blogRouter) // Alias for backwards compatibility
apiRouter.use('/upload', uploadRouter)
apiRouter.use('/send-email', emailRouter)
apiRouter.use('/contact', emailRouter)
