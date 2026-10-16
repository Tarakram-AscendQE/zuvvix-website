import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapLink from '@tiptap/extension-link'
import TiptapImage from '@tiptap/extension-image'
import { toast } from 'sonner'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { blogService, BlogItem } from '@/services/blogService'
import '@/styles/pages/blog-article.css'

// Helper: Format date
function formatDate(isoStr?: string): string {
  if (!isoStr) return 'Oct 16, 2026'
  try {
    return new Date(isoStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return isoStr
  }
}

// Helper: Estimate reading time
function estimateReadingTime(content: any): string {
  if (!content) return '2 min read'
  let text = ''
  if (typeof content === 'string') {
    text = content
  } else if (content.content && Array.isArray(content.content)) {
    text = JSON.stringify(content)
  }
  const words = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const [blog, setBlog] = useState<BlogItem | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<BlogItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [copied, setCopied] = useState<boolean>(false)

  // Initialize read-only Tiptap editor for rich content fidelity
  const editor = useEditor({
    editable: false,
    content: '',
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TiptapLink.configure({
        openOnClick: true,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'art-content-link',
        },
      }),
      TiptapImage.configure({
        HTMLAttributes: {
          class: 'art-content-inline-img',
        },
      }),
    ],
  })

  // Fetch article and related blogs
  useEffect(() => {
    let isMounted = true
    if (!slug) return

    const loadArticleData = async () => {
      setLoading(true)
      try {
        const fetchedBlog = await blogService.getBlogById(slug)
        if (!isMounted) return

        if (!fetchedBlog) {
          setBlog(null)
          setLoading(false)
          return
        }

        setBlog(fetchedBlog)

        // Parse content if string
        let parsedContent = fetchedBlog.content
        if (typeof parsedContent === 'string') {
          try {
            parsedContent = JSON.parse(parsedContent)
          } catch {
            // raw string fallback
          }
        }
        if (editor && parsedContent) {
          editor.commands.setContent(parsedContent)
        }

        // Fetch related blogs from the same topic or type
        const all = await blogService.getBlogs()
        if (isMounted && Array.isArray(all)) {
          const others = all.filter((b) => b.blog_id !== fetchedBlog.blog_id)
          // Sort by matching topic or type first
          const sorted = others.sort((a, b) => {
            const matchA = (a.topic === fetchedBlog.topic ? 2 : 0) + (a.type === fetchedBlog.type ? 1 : 0)
            const matchB = (b.topic === fetchedBlog.topic ? 2 : 0) + (b.type === fetchedBlog.type ? 1 : 0)
            return matchB - matchA
          })
          setRelatedBlogs(sorted.slice(0, 3))
        }
      } catch (err) {
        console.error('Failed to load article:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadArticleData()
    return () => {
      isMounted = false
    }
  }, [slug, editor])

  // Update editor content when blog changes
  useEffect(() => {
    if (editor && blog?.content) {
      let parsed = blog.content
      if (typeof parsed === 'string') {
        try {
          parsed = JSON.parse(parsed)
        } catch {
          // ignore
        }
      }
      editor.commands.setContent(parsed)
    }
  }, [editor, blog])

  // Copy link handler
  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast.success('Article link copied to clipboard!')
      setTimeout(() => setCopied(false), 2500)
    } catch {
      toast.info('Link: ' + window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="art-article-page wrap">
        <div className="art-loading-skeleton">
          <div className="art-skeleton-line short" />
          <div className="art-skeleton-line title" />
          <div className="art-skeleton-line title medium" />
          <div className="art-skeleton-box cover" />
          <div className="art-skeleton-line" />
          <div className="art-skeleton-line" />
          <div className="art-skeleton-line medium" />
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="art-article-page wrap art-not-found">
        <p className="art-not-found-code">404</p>
        <h1 className="art-not-found-title">Article Not Found</h1>
        <p className="art-not-found-desc">
          The article you are looking for does not exist or may have been updated.
        </p>
        <Link to="/thinking/" className="btn btn-primary" style={{ marginTop: '20px' }}>
          ← Back to Thinking Stream
        </Link>
      </div>
    )
  }

  return (
    <>
      <HeadMeta
        title={`${blog.title} | Zuvvix Thinking`}
        description={blog.excerpt || 'Read this perspective on enterprise quality operations from Zuvvix Thinking.'}
        canonicalPath={`/thinking/article/${blog.slug || blog.blog_id}/`}
      />

      <article className="art-article-page wrap">
        {/* Top Breadcrumb Navigation */}
        <nav className="art-article-nav" aria-label="Breadcrumb">
          <Link to="/thinking/" className="art-article-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Thinking
          </Link>
          <span className="art-article-nav-sep">/</span>
          <span className="art-article-nav-topic">{blog.topic || 'Category'}</span>
        </nav>

        {/* Article Header */}
        <header className="art-article-header">
          <div className="art-article-badges">
            {blog.topic && <span className="art-badge-topic">{blog.topic}</span>}
            {blog.type && <span className="art-badge-type">{blog.type}</span>}
            <span className="art-badge-maturity">
              <span className="art-maturity-dot" aria-hidden="true" />
              Published
            </span>
          </div>

          <h1 className="art-article-h1">{blog.title}</h1>

          {/* Metadata Row: Author, Date, Reading Time, Share */}
          <div className="art-article-meta">
            <div className="art-meta-author-group">
              <div className="art-author-avatar" aria-hidden="true">
                {(blog.author_name || 'Z')[0].toUpperCase()}
              </div>
              <div className="art-author-details">
                <span className="art-author-name">{blog.author_name || 'Zuvvix Author'}</span>
                <span className="art-author-role">Zuvvix Editorial Contributor</span>
              </div>
            </div>

            <div className="art-meta-timing-group">
              <span className="art-meta-date">{formatDate(blog.created_at)}</span>
              <span className="art-meta-dot">•</span>
              <span className="art-meta-reading">{estimateReadingTime(blog.content)}</span>
              <span className="art-meta-dot">•</span>
              <button
                type="button"
                className="art-share-btn"
                onClick={handleCopyLink}
                title="Copy article link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>
          </div>

          {/* Excerpt Pull-quote if available */}
          {blog.excerpt && (
            <blockquote className="art-article-excerpt">
              "{blog.excerpt}"
            </blockquote>
          )}

          {/* Hero Cover Image */}
          {blog.cover_image_url && (
            <div className="art-article-cover-wrap">
              <img
                src={blog.cover_image_url}
                alt={blog.title}
                className="art-article-cover-img"
              />
            </div>
          )}
        </header>

        {/* Main Article Body (Rendered with Tiptap) */}
        <div className="art-article-body">
          {editor ? (
            <div className="art-prose-content">
              <EditorContent editor={editor} />
            </div>
          ) : (
            <div className="art-prose-content fallback">
              <p>{blog.excerpt || 'Article text is loading...'}</p>
            </div>
          )}
        </div>

        {/* Article Tags */}
        {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="art-article-tags-wrap">
            <span className="art-tags-label">Tags:</span>
            <div className="art-tags-list">
              {blog.tags.map((tag, i) => (
                <span key={i} className="art-tag-pill">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Editorial Signature */}
        <div className="art-article-signature">
          <div className="art-sig-badge">Zuvvix Thinking</div>
          <p className="art-sig-text">
            Zuvvix Thinking publishes foundational concepts, systems architecture, and empirical evidence
            exploring the shift from activity-based testing to outcome-accountable quality operations.
          </p>
          <div className="art-sig-actions">
            <Link to="/thinking/" className="btn btn-quiet" style={{ fontSize: '13.5px' }}>
              ← Return to Stream
            </Link>
            <a href="/category/" className="btn btn-primary" style={{ fontSize: '13.5px' }}>
              Explore Category Vision
            </a>
          </div>
        </div>

        {/* Related Articles Section (At last of reading / active blog) */}
        {relatedBlogs.length > 0 && (
          <section className="art-related-section" aria-labelledby="related-heading">
            <div className="art-related-header">
              <p className="art-related-kicker">Continue Reading</p>
              <h2 id="related-heading" className="art-related-title">
                Related pieces in {blog.topic || 'Thinking'}
              </h2>
              <p className="art-related-desc">
                Further essays, operating principles, and evidence notes exploring this domain.
              </p>
            </div>

            <div className="art-related-grid">
              {relatedBlogs.map((rel) => (
                <article
                  key={rel.blog_id}
                  className="art-related-card"
                  onClick={() => {
                    navigate(`/thinking/article/${rel.slug || rel.blog_id}/`)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  {rel.cover_image_url && (
                    <div className="art-related-cover-wrap">
                      <img
                        src={rel.cover_image_url}
                        alt={rel.title}
                        className="art-related-cover-img"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="art-related-card-top">
                    <span className="art-related-type">{rel.type || 'Article'}</span>
                    <span className="art-related-topic">{rel.topic}</span>
                  </div>

                  <h3 className="art-related-card-title">{rel.title}</h3>

                  <p className="art-related-card-excerpt">
                    {rel.excerpt || 'Read the full perspective on enterprise quality operations.'}
                  </p>

                  <div className="art-related-card-footer">
                    <span className="art-related-date">{formatDate(rel.created_at)}</span>
                    <span className="art-related-link">
                      Read piece →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}

