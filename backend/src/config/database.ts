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

    // Ensure essential tables and initial admin exist
    await initializeDatabaseTables()

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

export async function initializeDatabaseTables(): Promise<void> {
  if (!pool) return

  try {
    // 1. Create admin_users table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 2. Create blogs table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS blogs (
        blog_id INT AUTO_INCREMENT PRIMARY KEY,
        author_id INT NULL,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) NOT NULL UNIQUE,
        excerpt TEXT NULL,
        content LONGTEXT NOT NULL,
        cover_image_url VARCHAR(1000) NULL,
        tags LONGTEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_author_id (author_id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // 3. Ensure default admin user exists with verified bcrypt hash
    await pool.execute(`
      INSERT INTO admin_users (username, password_hash, is_active)
      VALUES (
        'hello@zuvvix.com',
        '$2b$10$al16HOrw4CqJA/NtKzZQK.0hnpXdUqgSR4xzHChUZ79GQbGBRDOO.',
        1
      )
      ON DUPLICATE KEY UPDATE 
        password_hash = '$2b$10$al16HOrw4CqJA/NtKzZQK.0hnpXdUqgSR4xzHChUZ79GQbGBRDOO.',
        is_active = 1;
    `)

    console.log('✅ [Database] Auto-migration complete: tables & admin user verified.')
  } catch (err: any) {
    console.error('⚠️ [Database] Auto-migration notice:', err.message)
  }
}
