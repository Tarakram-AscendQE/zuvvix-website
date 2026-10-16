// Database Connection Manager
// Supports MySQL (GoDaddy / remote / local) with connection pooling and graceful fallback

import mysql, { Pool } from 'mysql2/promise'
import { config } from './index.js'

export let pool: Pool | null = null

// Initialize pool if credentials are provided
if (config.dbHost && config.dbUser) {
  pool = mysql.createPool({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000, // 10s timeout
  })
}

export async function connectDatabase(): Promise<boolean> {
  if (!pool) {
    console.log('[Database] No DB configuration provided. Running in in-memory mode.')
    return false
  }

  try {
    console.log(`[Database] Attempting connection to GoDaddy MySQL at ${config.dbHost}:${config.dbPort} (Database: ${config.dbName})...`)
    const conn = await pool.getConnection()
    console.log('✅ [Database] Connected successfully to GoDaddy MySQL database!')
    conn.release()
    return true
  } catch (err: any) {
    console.error('❌ [Database] Connection failed:', err.message)
    if (err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED') {
      console.error('👉 Tip: Check your GoDaddy cPanel "Remote MySQL" settings to make sure your IP is allowed.')
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('👉 Tip: Check your DB_USER, DB_PASSWORD, and ensure the user is assigned to the database in cPanel.')
    }
    return false
  }
}
