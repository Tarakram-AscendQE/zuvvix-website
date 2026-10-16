// Zuvvix Backend Server Entry Point
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { config } from './config/index.js'
import { connectDatabase } from './config/database.js'
import { apiRouter } from './routes/index.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const currentDir = path.dirname(fileURLToPath(import.meta.url))

// Works both from backend/src during development
// and backend/dist after the production build.
const frontendDistPath = path.resolve(
  currentDir,
  '../../frontend/dist'
)

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
// Serve the production React frontend.
app.use(express.static(frontendDistPath))

// React Router fallback: send the frontend for website routes.
app.get('*', (req, res, next) => {
  // Don't return the React page for unknown API endpoints.
  if (req.path === '/api' || req.path.startsWith('/api/')) {
    return next()
  }

  res.sendFile(path.join(frontendDistPath, 'index.html'))
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

