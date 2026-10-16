// Authentication Guard Middleware

import { Request, Response, NextFunction } from 'express'

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized access. Please log in to Zuvvix Studio.',
      timestamp: Date.now(),
    })
    return
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Invalid or missing authentication token.',
      timestamp: Date.now(),
    })
    return
  }

  // Token valid (in production, verify with jwt.verify(token, config.jwtSecret))
  next()
}

