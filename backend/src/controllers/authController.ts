// Auth Controller
// Authenticates users strictly against GoDaddy MySQL `admin_users` table with bcrypt hash comparison

import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { pool } from '../config/database.js'

export async function login(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body || {}

  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: 'Both username and password are required.',
      timestamp: Date.now(),
    })
    return
  }

  const cleanUser = String(username).trim().toLowerCase()
  const cleanPass = String(password).trim()

  if (!pool) {
    res.status(503).json({
      success: false,
      message: 'Database service is currently unavailable. Please contact the administrator.',
      timestamp: Date.now(),
    })
    return
  }

  try {
    // Query GoDaddy MySQL database (`admin_users` table)
    const [rows]: any = await pool.execute(
      'SELECT user_id, username, password_hash, is_active FROM admin_users WHERE LOWER(username) = ? LIMIT 1',
      [cleanUser]
    )

    if (!rows || rows.length === 0) {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password. Please try again.',
        timestamp: Date.now(),
      })
      return
    }

    const dbUser = rows[0]

    // Check if account is active
    if (!dbUser.is_active) {
      res.status(403).json({
        success: false,
        message: 'Your account is deactivated. Please contact your administrator.',
        timestamp: Date.now(),
      })
      return
    }

    // Compare entered password with stored bcrypt hash
    const isMatch = await bcrypt.compare(cleanPass, dbUser.password_hash)

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password. Please try again.',
        timestamp: Date.now(),
      })
      return
    }

    // Success: generate authenticated session token
    const token = `zvx_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    const rawName = dbUser.username.includes('@') ? dbUser.username.split('@')[0] : dbUser.username
    const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1)

    res.status(200).json({
      success: true,
      message: `Welcome back, ${displayName}!`,
      session: {
        id: dbUser.user_id,
        username: dbUser.username,
        displayName,
        role: 'admin',
        token,
        loginTime: Date.now(),
      },
      token,
      timestamp: Date.now(),
    })
  } catch (dbErr: any) {
    console.error('[Database Auth Error]', dbErr.message)
    res.status(500).json({
      success: false,
      message: 'Authentication error occurred. Please try again.',
      timestamp: Date.now(),
    })
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
    timestamp: Date.now(),
  })
}

export async function getMe(req: Request, res: Response): Promise<void> {
  res.status(200).json({
    success: true,
    data: {
      username: 'admin',
      displayName: 'Zuvvix Admin',
      role: 'admin',
    },
    timestamp: Date.now(),
  })
}
