// Common Authentication & User Types

export type UserRole = 'admin' | 'editor' | 'author' | 'viewer'

export interface UserSession {
  id?: number
  username: string
  displayName: string
  role: UserRole
  token: string
  loginTime: number
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  session?: UserSession
  token?: string
}

