// Global Error Handling Middleware

import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error('[Error]', err)

  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error occurred.',
    timestamp: Date.now(),
  })
}

