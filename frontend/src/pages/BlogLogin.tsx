import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { blogAuthService } from '@/services/blogAuthService'
import '@/styles/pages/blog-login.css'

interface BlogLoginProps {
  onLoginSuccess: () => void
}

export function BlogLogin({ onLoginSuccess }: BlogLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password.')
      return
    }

    setIsLoading(true)
    try {
      const result = await blogAuthService.login(username, password)
      if (result.success) {
        toast.success(`Welcome back, ${result.session?.displayName || username}!`)
        onLoginSuccess()
      } else {
        setErrorMessage(result.message || 'Invalid username or password.')
        toast.error('Authentication failed')
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bl-root">
      <div className="bl-card">
        {/* Header */}
        <div className="bl-header">
          <Link to="/" className="bl-logo-wrap" title="Zuvvix home">
            <img
              src="/assets/img/zuvvix-logo.png"
              alt="Zuvvix"
              className="bl-logo"
              width="131"
              height="28"
            />
          </Link>
          <span className="bl-badge">Studio Portal</span>
          <h1 className="bl-title">Sign in to Zuvvix Studio</h1>
          <p className="bl-subtitle">Enter your credentials to publish articles and manage blogs.</p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="bl-error-box" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="bl-form" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="bl-field">
            <label className="bl-label" htmlFor="bl-username">
              Username
            </label>
            <div className="bl-input-wrap">
              <span className="bl-input-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                id="bl-username"
                type="text"
                className="bl-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (errorMessage) setErrorMessage('')
                }}
                autoComplete="username"
                autoFocus
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="bl-field">
            <label className="bl-label" htmlFor="bl-password">
              Password
            </label>
            <div className="bl-input-wrap">
              <span className="bl-input-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="bl-password"
                type={showPassword ? 'text' : 'password'}
                className="bl-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errorMessage) setErrorMessage('')
                }}
                autoComplete="current-password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="bl-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bl-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="bl-spinner" aria-hidden="true" />
                Signing in...
              </>
            ) : (
              <>
                Sign in to Studio
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Back to Thinking Link */}
      <Link to="/thinking/" className="bl-back-link">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Zuvvix Thinking
      </Link>
    </div>
  )
}

