import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { blogAuthService } from '@/services/blogAuthService'
import { blogService, BlogItem } from '@/services/blogService'
import { Search, Eye, Pencil, Trash2, MoreVertical, FileText } from 'lucide-react'
import '@/styles/pages/blog-dashboard.css'

export type { BlogItem }

interface BlogDashboardProps {
  onWriteNew: () => void
  onEditBlog: (blog: BlogItem) => void
  onViewBlog: (blog: BlogItem) => void
  onLogout: () => void
}

export function BlogDashboard({ onWriteNew, onEditBlog, onViewBlog, onLogout }: BlogDashboardProps) {
  const [blogs, setBlogs] = useState<BlogItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMenuId, setActiveMenuId] = useState<number | string | null>(null)
  const [deleteBlog, setDeleteBlog] = useState<BlogItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const session = blogAuthService.getSession()
  const authorName = session?.displayName || session?.username || 'Admin'

  const fetchBlogs = async () => {
    setIsLoading(true)
    try {
      setBlogs(await blogService.getBlogs())
    } catch {
      setBlogs([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key === 'Escape') {
        setActiveMenuId(null)
        setDeleteBlog(null)
      } else if (e instanceof MouseEvent && !(e.target as HTMLElement).closest('.bd-dots-wrap')) {
        setActiveMenuId(null)
      }
    }
    document.addEventListener('click', close)
    window.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('click', close)
      window.removeEventListener('keydown', close)
    }
  }, [])

  const handleDelete = async () => {
    if (!deleteBlog) return
    setIsDeleting(true)
    try {
      const res = await blogService.deleteBlog(deleteBlog.blog_id)
      if (res.success) {
        toast.success(`"${deleteBlog.title}" deleted.`)
        setBlogs((prev) => prev.filter((b) => b.blog_id !== deleteBlog.blog_id))
      } else {
        toast.error(res.message || 'Failed to delete blog.')
      }
    } catch {
      toast.error('Failed to delete blog.')
    } finally {
      setIsDeleting(false)
      setDeleteBlog(null)
    }
  }

  const filtered = blogs.filter((b) => {
    const q = searchQuery.toLowerCase().trim()
    return !q || [b.title, b.slug, b.excerpt, b.topic, b.type].some((v) => v?.toLowerCase().includes(q))
  })

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return iso
    }
  }

  return (
    <div className="bd-root">
      {/* Top Header */}
      <header className="bd-topbar">
        <div className="bd-topbar-inner">
          <div className="bd-topbar-left">
            <Link to="/" title="Zuvvix Home">
              <img src="/assets/img/zuvvix-logo.png" alt="Zuvvix" className="bd-logo" />
            </Link>
            <span className="bd-portal-badge">Studio Portal</span>
            <span className="bd-divider" />
            <span className="bd-portal-title">Blog Management</span>
          </div>

          <div className="bd-topbar-right">
            <div className="bd-user-info">
              <span className="bd-user-avatar">{authorName[0]?.toUpperCase()}</span>
              <span>{authorName}</span>
            </div>
            <button type="button" className="bd-logout-btn" onClick={onLogout}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bd-main">
        <div className="bd-page-header">
          <div>
            <h1 className="bd-page-title">All Blogs & Articles</h1>
            <p className="bd-page-subtitle">Manage, publish, and edit articles live on the Zuvvix Thinking stream.</p>
          </div>
          <button type="button" className="bd-create-btn" onClick={onWriteNew}>
            + Write New Blog
          </button>
        </div>

        {/* Search Bar */}
        <div className="bd-filter-bar">
          <div className="bd-search-wrap">
            <span className="bd-search-icon">
              <Search size={15} />
            </span>
            <input
              type="text"
              className="bd-search-input"
              placeholder="Search blogs by title, slug, or excerpt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <span className="bd-count-pill">
            {filtered.length} {filtered.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        {/* 3-Column Card Grid */}
        {isLoading ? (
          <div className="bd-empty-card">Loading articles...</div>
        ) : filtered.length === 0 ? (
          <div className="bd-empty-card">
            <p className="bd-empty-title">{searchQuery ? 'No matching blogs found' : 'No blogs created yet'}</p>
            {!searchQuery && (
              <button type="button" className="bd-create-btn" onClick={onWriteNew}>
                + Write Your First Blog
              </button>
            )}
          </div>
        ) : (
          <div className="bd-grid">
            {filtered.map((blog) => {
              const topic = blog.topic || blog.content?.topic
              const type = blog.type || blog.content?.blogType || blog.content?.type

              return (
                <article key={blog.blog_id} className="bd-card">
                  {/* Media Thumbnail */}
                  <div className="bd-media" onClick={() => onViewBlog(blog)}>
                    {blog.cover_image_url ? (
                      <img src={blog.cover_image_url} alt={blog.title} className="bd-img" loading="lazy" />
                    ) : (
                      <div className="bd-img-placeholder">
                        <FileText size={28} />
                      </div>
                    )}

                    {/* Topic/Type Badges */}
                    <div className="bd-badges">
                      {topic && <span className="bd-badge-topic">{topic}</span>}
                      {type && <span className="bd-badge-type">{type}</span>}
                    </div>

                    {/* 3-Dots Action Menu */}
                    <div className="bd-dots-wrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className={`bd-dots-btn ${activeMenuId === blog.blog_id ? 'active' : ''}`}
                        onClick={() => setActiveMenuId((prev) => (prev === blog.blog_id ? null : blog.blog_id))}
                        aria-label="Blog actions menu"
                      >
                        <MoreVertical size={15} />
                      </button>

                      {activeMenuId === blog.blog_id && (
                        <div className="bd-dropdown">
                          <button
                            type="button"
                            className="bd-menu-item"
                            onClick={() => {
                              setActiveMenuId(null)
                              onViewBlog(blog)
                            }}
                          >
                            <Eye size={14} />
                            <span>View</span>
                          </button>
                          <button
                            type="button"
                            className="bd-menu-item"
                            onClick={() => {
                              setActiveMenuId(null)
                              onEditBlog(blog)
                            }}
                          >
                            <Pencil size={14} />
                            <span>Edit</span>
                          </button>
                          <hr className="bd-menu-divider" />
                          <button
                            type="button"
                            className="bd-menu-item delete"
                            onClick={() => {
                              setActiveMenuId(null)
                              setDeleteBlog(blog)
                            }}
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="bd-card-body">
                    <h3 className="bd-card-title" onClick={() => onViewBlog(blog)}>
                      {blog.title}
                    </h3>
                    <p className="bd-card-excerpt">{blog.excerpt || 'No summary excerpt provided.'}</p>
                    <span className="bd-slug-tag">/{blog.slug}</span>
                  </div>

                  {/* Card Footer */}
                  <div className="bd-card-footer">
                    <div className="bd-author-row">
                      <span className="bd-author-initial">{(blog.author_name || authorName)[0]?.toUpperCase()}</span>
                      <span className="bd-author-name">{blog.author_name || authorName}</span>
                    </div>
                    <span className="bd-date">{formatDate(blog.created_at)}</span>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteBlog && (
        <div className="bd-modal-backdrop" onClick={() => setDeleteBlog(null)}>
          <div className="bd-delete-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="bd-delete-title">Delete this article?</h3>
            <p className="bd-delete-text">
              Are you sure you want to delete <strong>"{deleteBlog.title}"</strong>? This action cannot be undone.
            </p>
            <div className="bd-delete-actions">
              <button type="button" className="bd-btn-secondary" onClick={() => setDeleteBlog(null)} disabled={isDeleting}>
                Cancel
              </button>
              <button type="button" className="bd-btn-danger" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
