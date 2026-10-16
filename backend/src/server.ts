// Zuvvix Backend Server Entry Point

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { config } from './config/index.js'
import { connectDatabase } from './config/database.js'
import { apiRouter } from './routes/index.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

// Security & Parsing Middleware
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static file serving for uploaded blog images
app.use('/uploads/blogs', express.static(config.uploadDir))

// Mount Central API Router
app.use('/api', apiRouter)

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    service: 'Zuvvix Studio API',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      articles: '/api/articles',
    },
  })
})

// Global Error Handler
app.use(errorHandler)

// Start Server
async function startServer() {
  await connectDatabase()

  app.listen(config.port, () => {
    console.log(`🚀 Zuvvix Backend running on http://localhost:${config.port}`)
    console.log(`📡 API Health: http://localhost:${config.port}/api/health`)
  })
}

startServer().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})

export default app

