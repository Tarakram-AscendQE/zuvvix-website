// Application Configuration

import path from 'path'

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'zuvvix_dev_secret_key_2026',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL || '',
  dbHost: process.env.DB_HOST || '',
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || '',
  uploadDir: process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'public/uploads/blogs'),
  uploadBaseUrl: process.env.UPLOAD_BASE_URL || '/uploads/blogs',
}
