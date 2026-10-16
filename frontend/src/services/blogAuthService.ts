// Blog Authentication Service
// Authenticates exclusively against the backend API and GoDaddy MySQL database

import type { UserSession, LoginCredentials } from '@common/types'

export type { UserSession, LoginCredentials }

const AUTH_STORAGE_KEY = 'zuvvix_blog_auth'

export const blogAuthService = {
  // Check if current session is authenticated
  isAuthenticated(): boolean {
    try {
      const data = sessionStorage.getItem(AUTH_STORAGE_KEY)
      if (!data) return false
      const session: UserSession = JSON.parse(data)
      return !!session.token && !!session.username
    } catch {
      return false
    }
  },

  // Get current session data
  getSession(): UserSession | null {
    try {
      const data = sessionStorage.getItem(AUTH_STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  },

  // Authenticate user with credentials via backend API
  async login(username: string, password: string): Promise<{ success: boolean; message?: string; session?: UserSession }> {
    const cleanUsername = username.trim().toLowerCase()
    const cleanPassword = password.trim()

    if (!cleanUsername || !cleanPassword) {
      return { success: false, message: 'Please enter both username and password.' }
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: cleanUsername,
          password: cleanPassword,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success && data.session) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.session))
        return { success: true, session: data.session }
      }

      return {
        success: false,
        message: data.message || 'Invalid username or password. Please try again.',
      }
    } catch (err) {
      console.error('[blogAuthService] Login network error:', err)
      return {
        success: false,
        message: 'Could not connect to authentication server. Please ensure the backend is running.',
      }
    }
  },

  // Clear session
  logout(): void {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
  },
}
