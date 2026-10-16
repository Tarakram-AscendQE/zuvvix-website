import React, { useState } from 'react'
import { blogAuthService } from '@/services/blogAuthService'
import { BlogLogin } from '@/pages/BlogLogin'
import { BlogDashboard, BlogItem } from '@/pages/BlogDashboard'
import { ArticlePublish } from '@/pages/ArticlePublish'

export function BlogAuthGate() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => blogAuthService.isAuthenticated())
  const [currentView, setCurrentView] = useState<'dashboard' | 'editor'>('dashboard')
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null)
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    blogAuthService.logout()
    setIsAuthenticated(false)
    setCurrentView('dashboard')
    setSelectedBlog(null)
    setIsReadOnly(false)
  }

  const handleWriteNew = () => {
    setSelectedBlog(null)
    setIsReadOnly(false)
    setCurrentView('editor')
  }

  const handleEditBlog = (blog: BlogItem) => {
    setSelectedBlog(blog)
    setIsReadOnly(false)
    setCurrentView('editor')
  }

  const handleViewBlog = (blog: BlogItem) => {
    setSelectedBlog(blog)
    setIsReadOnly(true)
    setCurrentView('editor')
  }

  const handleBackToDashboard = () => {
    setSelectedBlog(null)
    setIsReadOnly(false)
    setCurrentView('dashboard')
  }

  if (!isAuthenticated) {
    return <BlogLogin onLoginSuccess={handleLoginSuccess} />
  }

  if (currentView === 'editor') {
    return (
      <ArticlePublish
        initialBlog={selectedBlog}
        initialReadOnly={isReadOnly}
        onBackToDashboard={handleBackToDashboard}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <BlogDashboard
      onWriteNew={handleWriteNew}
      onEditBlog={handleEditBlog}
      onViewBlog={handleViewBlog}
      onLogout={handleLogout}
    />
  )
}
