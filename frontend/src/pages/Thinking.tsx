import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { HeadMeta } from '@/components/seo/HeadMeta'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useModal } from '@/context/ModalContext'
import { blogService, BlogItem } from '@/services/blogService'

// Helper: map topic text to CSS filter slug
function topicToSlug(topic?: string | null): string {
  if (!topic) return 'category'
  const t = topic.toLowerCase().trim()
  if (t === 'cra' || t.includes('continuous') || t.includes('assurance')) return 'cra'
  if (t.includes('build')) return 'build-notes'
  if (t.includes('evidence')) return 'evidence'
  if (t.includes('system')) return 'system'
  if (t.includes('trust')) return 'trust'
  return 'category'
}

// Helper: map type text to CSS filter slug
function typeToSlug(type?: string | null): string {
  if (!type) return 'category-essay'
  const t = type.toLowerCase().trim()
  if (t.includes('essay')) return 'category-essay'
  if (t.includes('explainer')) return 'explainer'
  if (t.includes('build')) return 'build-note'
  if (t.includes('evidence')) return 'evidence-note'
  if (t.includes('brief') || t.includes('cxo')) return 'cxo-brief'
  return 'category-essay'
}

// Existing hardcoded launch slate pieces
interface StaticPiece {
  id: string
  title: string
  dek: string
  topic: string
  type: string
  topicSlug: string
  typeSlug: string
  maturity: 'Thesis' | 'Designed' | 'Placeholder'
  maturityClass: string
  status: string
  relUrl?: string
  relLabel?: string
  isPlaceholder?: boolean
}

const EXISTING_PIECES: StaticPiece[] = [
  {
    id: 'p01',
    title: 'Why passing tests is not the same as evidence',
    dek: 'A green run records that activity happened. A release decision needs to know what was established, for which risk, and what is still unknown.',
    topic: 'Category',
    type: 'Category Essay',
    topicSlug: 'category',
    typeSlug: 'category-essay',
    maturity: 'Thesis',
    maturityClass: 'm-thesis',
    status: 'In preparation',
    relUrl: '/assurance-case/',
    relLabel: 'Assurance Case',
  },
  {
    id: 'p02',
    title: 'From Quality by Activity to Quality by Accountability',
    dek: 'Why the unit of value in enterprise quality has to move from effort performed to responsibility accepted and evidenced.',
    topic: 'Category',
    type: 'Category Essay',
    topicSlug: 'category',
    typeSlug: 'category-essay',
    maturity: 'Thesis',
    maturityClass: 'm-thesis',
    status: 'In preparation',
    relUrl: '/category/',
    relLabel: 'Outcome-Accountable Quality Operations',
  },
  {
    id: 'p03',
    title: 'What is a Quality Mandate?',
    dek: 'Scope, exclusions, authority, evidence requirements and service dimensions: the contract that makes a quality responsibility explicit.',
    topic: 'System',
    type: 'Explainer',
    topicSlug: 'system',
    typeSlug: 'explainer',
    maturity: 'Designed',
    maturityClass: 'm-designed',
    status: 'In preparation',
    relUrl: '/quality-mandate/',
    relLabel: 'Quality Mandate',
  },
  {
    id: 'p04',
    title: 'Enterprise Intelligence is not a knowledge graph',
    dek: 'Storing relationships is not the same as reasoning about what a change affects, what is known and what has gone stale.',
    topic: 'System',
    type: 'Explainer',
    topicSlug: 'system',
    typeSlug: 'explainer',
    maturity: 'Designed',
    maturityClass: 'm-designed',
    status: 'In preparation',
    relUrl: '/how-it-works/',
    relLabel: 'How Zuvvix works',
  },
  {
    id: 'p05',
    title: 'Why competence must be qualified before autonomy is granted',
    dek: 'Autonomy is earned task by task through demonstrated competence, then bounded by explicit authority.',
    topic: 'System',
    type: 'Explainer',
    topicSlug: 'system',
    typeSlug: 'explainer',
    maturity: 'Designed',
    maturityClass: 'm-designed',
    status: 'In preparation',
    relUrl: '/trust/',
    relLabel: 'Bounded autonomy',
  },
  {
    id: 'p06',
    title: 'Why AI cannot be its own evidence',
    dek: 'A model agreeing with a model is not independent verification. What counts as evidence, and why the distinction decides trust.',
    topic: 'Trust',
    type: 'Category Essay',
    topicSlug: 'trust',
    typeSlug: 'category-essay',
    maturity: 'Thesis',
    maturityClass: 'm-thesis',
    status: 'In preparation',
    relUrl: '/trust/',
    relLabel: 'Bounded autonomy',
  },
  {
    id: 'p07',
    title: 'Why INDETERMINATE is a feature of trustworthy assurance',
    dek: 'A system that can say “not established” is more useful to a release decision than one that always produces an answer.',
    topic: 'Trust',
    type: 'Explainer',
    topicSlug: 'trust',
    typeSlug: 'explainer',
    maturity: 'Designed',
    maturityClass: 'm-designed',
    status: 'In preparation',
    relUrl: '/readiness/',
    relLabel: 'Readiness states',
  },
  {
    id: 'p08',
    title: 'The hidden economics of quality coordination',
    dek: 'Where enterprise quality cost actually accumulates: handoffs, waiting, rework and decisions taken without evidence.',
    topic: 'Category',
    type: 'CXO Brief',
    topicSlug: 'category',
    typeSlug: 'cxo-brief',
    maturity: 'Thesis',
    maturityClass: 'm-thesis',
    status: 'In preparation',
    relUrl: '/category/',
    relLabel: 'Outcome-Accountable Quality Operations',
  },
  {
    id: 'p09',
    title: 'What quality accountability changes for the CIO',
    dek: 'What shifts in operating risk, decision speed and supplier governance when quality is bought as an accountable responsibility.',
    topic: 'Category',
    type: 'CXO Brief',
    topicSlug: 'category',
    typeSlug: 'cxo-brief',
    maturity: 'Thesis',
    maturityClass: 'm-thesis',
    status: 'In preparation',
    relUrl: '/category/',
    relLabel: 'Outcome-Accountable Quality Operations',
  },
  {
    id: 'p10',
    title: 'Designing Continuous Release Assurance around one critical journey',
    dek: 'How the first capability is being scoped: one journey, recurring change, and an evidence-backed readiness position for every release.',
    topic: 'Continuous Release Assurance',
    type: 'Build Note',
    topicSlug: 'cra',
    typeSlug: 'build-note',
    maturity: 'Designed',
    maturityClass: 'm-designed',
    status: 'In preparation',
    relUrl: '/continuous-release-assurance/',
    relLabel: 'Continuous Release Assurance',
  },
  {
    id: 'p11',
    title: 'What we learned by separating competence, authority and accountability',
    dek: 'Design decisions from keeping apart three ideas that are easy to conflate and expensive to merge.',
    topic: 'Build Notes',
    type: 'Build Note',
    topicSlug: 'build-notes',
    typeSlug: 'build-note',
    maturity: 'Designed',
    maturityClass: 'm-designed',
    status: 'In preparation',
    relUrl: '/trust/',
    relLabel: 'Bounded autonomy',
  },
  {
    id: 'p12',
    title: 'From designed to demonstrated: what evidence changed our confidence',
    dek: 'Not published. This piece is written only when the underlying work reaches DEMONSTRATED, and will state scope, method, result and limitations.',
    topic: 'Evidence',
    type: 'Evidence Note',
    topicSlug: 'evidence',
    typeSlug: 'evidence-note',
    maturity: 'Placeholder',
    maturityClass: '',
    status: 'Awaits evidence',
    isPlaceholder: true,
  },
]

interface UnifiedThinkingItem {
  key: string | number
  title: string
  excerpt: string
  topic: string
  type: string
  topicSlug: string
  typeSlug: string
  isDbBlog: boolean
  dbBlog?: BlogItem
  cover_image_url?: string | null
  createdAt?: string
  authorName?: string
  maturity?: string
  maturityClass?: string
  status?: string
  relUrl?: string
  relLabel?: string
  isPlaceholder?: boolean
}

export function Thinking() {
  useScrollReveal()
  const { openFollow } = useModal()

  // Live Blogs from GoDaddy Database
  const [blogs, setBlogs] = useState<BlogItem[]>([])
  const [selectedTopic, setSelectedTopic] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  // Fetch blogs from GET /api/blogs
  useEffect(() => {
    let isMounted = true
    const fetchArticles = async () => {
      try {
        const data = await blogService.getBlogs()
        if (isMounted && Array.isArray(data)) {
          setBlogs(data)
        }
      } catch (err) {
        console.error('Failed to fetch blogs for Thinking page:', err)
      }
    }
    fetchArticles()
    return () => {
      isMounted = false
    }
  }, [])

  // Newsletter form submission handler
  useEffect(() => {
    const f = document.getElementById('fform') as HTMLFormElement | null
    const em = document.getElementById('f-email') as HTMLInputElement | null
    const er = document.getElementById('e-email') as HTMLElement | null

    const handleForm = (e: SubmitEvent) => {
      e.preventDefault()
      if (!em || !f) return
      const ok = em.value.trim() !== '' && em.checkValidity()
      if (er) er.hidden = ok
      em.setAttribute('aria-invalid', String(!ok))
      if (!ok) {
        em.focus()
        return
      }
      toast.success('Thank you for following the build!')
      const msg = document.createElement('p')
      msg.className = 'done-msg'
      msg.setAttribute('role', 'status')
      msg.textContent = 'Thank you. You will receive new essays, build notes and evidence notes as they are published.'
      const row = f.querySelector('.row') as HTMLElement | null
      if (row) row.hidden = true
      if (er) er.hidden = true
      const pv = f.querySelector('.pv-note')
      f.insertBefore(msg, pv)
    }

    if (f) f.addEventListener('submit', handleForm)
    return () => {
      if (f) f.removeEventListener('submit', handleForm)
    }
  }, [])

  // Format date helper
  const formatDate = (isoStr?: string) => {
    if (!isoStr) return 'Oct 15, 2026'
    try {
      return new Date(isoStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return isoStr
    }
  }

  // Extract text from Tiptap AST or string
  const getContentSnippet = (content: any): string => {
    if (!content) return ''
    if (typeof content === 'string') {
      try {
        const parsed = JSON.parse(content)
        return getContentSnippet(parsed)
      } catch {
        return content.replace(/<[^>]+>/g, '')
      }
    }
    if (content.content && Array.isArray(content.content)) {
      return content.content
        .map((node: any) => node.content?.map((c: any) => c.text || '').join('') || '')
        .filter(Boolean)
        .join('\n\n')
    }
    return ''
  }

  // Prepare DB items (newest at position 1)
  const dbItems: UnifiedThinkingItem[] = blogs.map((b) => ({
    key: `db-${b.blog_id}`,
    title: b.title,
    excerpt: b.excerpt || 'Read the full perspective on enterprise quality operations.',
    topic: b.topic || 'Category',
    type: b.type || 'Explainer',
    topicSlug: topicToSlug(b.topic),
    typeSlug: typeToSlug(b.type),
    isDbBlog: true,
    dbBlog: b,
    cover_image_url: b.cover_image_url,
    createdAt: b.created_at,
    authorName: b.author_name || 'Zuvvix Author',
    maturity: 'Demonstrated',
    maturityClass: 'm-demonstrated',
    status: 'Published',
  }))

  // Prepare existing items
  const staticItems: UnifiedThinkingItem[] = EXISTING_PIECES.map((s) => ({
    key: s.id,
    title: s.title,
    excerpt: s.dek,
    topic: s.topic,
    type: s.type,
    topicSlug: s.topicSlug,
    typeSlug: s.typeSlug,
    isDbBlog: false,
    maturity: s.maturity,
    maturityClass: s.maturityClass,
    status: s.status,
    relUrl: s.relUrl,
    relLabel: s.relLabel,
    isPlaceholder: s.isPlaceholder,
  }))

  const PAGE_SIZE = 9
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedTopic, selectedType])

  // Merged: Database blogs FIRST (1st position), followed by the existing 12 launch slate pieces
  const allPieces: UnifiedThinkingItem[] = [...dbItems, ...staticItems]

  // Filtered pieces based on taxonomy selection
  const filteredPieces = allPieces.filter((item) => {
    const matchTopic = selectedTopic === 'all' || item.topicSlug === selectedTopic
    const matchType = selectedType === 'all' || item.typeSlug === selectedType
    return matchTopic && matchType
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredPieces.length / PAGE_SIZE)
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1))
  const startIndex = (validCurrentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const paginatedPieces = filteredPieces.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    const target = document.getElementById('latest')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Helper for generating page numbers with ellipsis for large sets
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const pages: (number | string)[] = []
    if (validCurrentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages)
    } else if (validCurrentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, '...', validCurrentPage - 1, validCurrentPage, validCurrentPage + 1, '...', totalPages)
    }
    return pages
  }

  // Count helpers for filter buttons
  const countByTopic = (slug: string) => allPieces.filter((p) => p.topicSlug === slug).length
  const countByType = (slug: string) => allPieces.filter((p) => p.typeSlug === slug).length

  return (
    <>
      <HeadMeta
        title="Thinking | Zuvvix"
        description="Essays, operating principles and evidence notes on enterprise quality, bounded autonomy, and release decisions."
        canonicalPath="/thinking/"
      />

      {/* 01 HERO */}
      <section className="th-hero" id="top" aria-labelledby="h1">
        <div className="wrap th-hero-grid">
          <div>
            <p className="eyebrow">Thinking</p>
            <h1 className="h1" id="h1">Ideas for operating quality as an accountable system.</h1>
            <p className="lede">
              Enterprise quality is changing faster than the operating model used to govern it. Zuvvix Thinking develops
              the concepts, distinctions, evidence and lessons behind a different model: Quality by Accountability.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#follow">Follow the build</a>
              <a className="btn btn-quiet" href="/category/">Start with Outcome-Accountable Quality Operations</a>
            </div>
          </div>
          <aside className="th-contract" aria-labelledby="h-contract">
            <h2 id="h-contract">What Thinking is for</h2>
            <dl>
              <div className="yes">
                <dt>Belongs here</dt>
                <dd>Category essays, explainers, build notes, evidence notes and CXO briefs.</dd>
              </div>
              <div className="no">
                <dt>Does not belong here</dt>
                <dd>Company news, generic AI commentary, SEO filler, unbounded predictions or product advertising disguised as thought leadership.</dd>
              </div>
            </dl>
            <p>Every piece carries a content type. Material claims carry a maturity state, scope, limitations and evidence links where relevant.</p>
          </aside>
        </div>
      </section>

      {/* 02 FEATURED IDEA */}
      <section className="sec tint" id="featured" aria-labelledby="h-feat">
        <div className="wrap">
          <p className="kicker"><span className="idx">02</span><span className="label">Featured idea</span></p>
          <p className="th-intro" id="h-feat">We write to make difficult enterprise-quality problems easier to reason about—not to make AI look impressive.</p>
          <article className="th-feat" aria-labelledby="t-feat">
            <div className="th-feat-main">
              <div className="th-card-top">
                <span className="th-type">Category Essay</span>
                <span className="th-mat m-thesis"><i aria-hidden="true"></i><span className="sr">Claim maturity: </span>Thesis</span>
              </div>
              <h3 id="t-feat">Why passing tests is not the same as evidence</h3>
              <p className="th-dek">
                A green run records that activity happened. It does not say what was established, for which business risk,
                under what conditions, or what remains unknown. Release decisions need the second kind of statement, and most
                quality operating models only produce the first.
              </p>
              <p className="th-meta">
                <span className="th-no">01</span><span>Category</span><span>Reframe the problem</span><span>In preparation</span>
              </p>
              <a className="link-arrow" href="/assurance-case/">Related concept: the Assurance Case</a>
            </div>
            <figure className="th-feat-fig" aria-labelledby="fc-feat">
              <figcaption id="fc-feat">The distinction the essay develops</figcaption>
              <div className="th-col act">
                <b>What a passing run records</b>
                <ul>
                  <li>Tests executed</li>
                  <li>Pass rate</li>
                  <li>Automation coverage</li>
                </ul>
              </div>
              <p className="th-gap" aria-hidden="true">is not the same as</p>
              <div className="th-col acc">
                <b>What a release decision needs</b>
                <ul>
                  <li>What was established, for which risk</li>
                  <li>Under which conditions and authority</li>
                  <li>What remains unknown or stale</li>
                </ul>
              </div>
            </figure>
          </article>
        </div>
      </section>

      {/* 03 LATEST THINKING (LIVE DATABASE ARTICLES + EXISTING PIECES) */}
      <section className="sec" id="latest" aria-labelledby="h-latest">
        <div className="wrap">
          <div>
            <p className="kicker"><span className="idx">03</span><span className="label">Latest thinking</span></p>
            <h2 className="h2" id="h-latest" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>
              {allPieces.length} pieces that teach the category in sequence.
            </h2>
            <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>
              The launch slate moves from dissatisfaction to vocabulary, system, trust, executive implication, build and
              evidence. Explore it by topic or by type—not only by date.
            </p>
          </div>

          {/* Taxonomy Filters */}
          <div className="th-filters" id="filters">
            {/* Topic Filter */}
            <div className="th-fg" role="group" aria-labelledby="fg-topic">
              <span id="fg-topic">Topic</span>
              <div className="th-fl">
                <button
                  type="button"
                  className="th-f"
                  data-topic="all"
                  aria-pressed={selectedTopic === 'all'}
                  onClick={() => setSelectedTopic('all')}
                >
                  All topics
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-topic="category"
                  aria-pressed={selectedTopic === 'category'}
                  onClick={() => setSelectedTopic('category')}
                >
                  Category<span className="th-c" aria-hidden="true">{countByTopic('category')}</span>
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-topic="system"
                  aria-pressed={selectedTopic === 'system'}
                  onClick={() => setSelectedTopic('system')}
                >
                  System<span className="th-c" aria-hidden="true">{countByTopic('system')}</span>
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-topic="trust"
                  aria-pressed={selectedTopic === 'trust'}
                  onClick={() => setSelectedTopic('trust')}
                >
                  Trust<span className="th-c" aria-hidden="true">{countByTopic('trust')}</span>
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-topic="cra"
                  aria-pressed={selectedTopic === 'cra'}
                  onClick={() => setSelectedTopic('cra')}
                >
                  Continuous Release Assurance<span className="th-c" aria-hidden="true">{countByTopic('cra')}</span>
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-topic="build-notes"
                  aria-pressed={selectedTopic === 'build-notes'}
                  onClick={() => setSelectedTopic('build-notes')}
                >
                  Build Notes<span className="th-c" aria-hidden="true">{countByTopic('build-notes')}</span>
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-topic="evidence"
                  aria-pressed={selectedTopic === 'evidence'}
                  onClick={() => setSelectedTopic('evidence')}
                >
                  Evidence<span className="th-c" aria-hidden="true">{countByTopic('evidence')}</span>
                </button>
              </div>
            </div>

            {/* Type Filter */}
            <div className="th-fg" role="group" aria-labelledby="fg-type">
              <span id="fg-type">Type</span>
              <div className="th-fl">
                <button
                  type="button"
                  className="th-f"
                  data-type="all"
                  aria-pressed={selectedType === 'all'}
                  onClick={() => setSelectedType('all')}
                >
                  All types
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-type="category-essay"
                  aria-pressed={selectedType === 'category-essay'}
                  onClick={() => setSelectedType('category-essay')}
                >
                  Category Essay<span className="th-c" aria-hidden="true">{countByType('category-essay')}</span>
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-type="explainer"
                  aria-pressed={selectedType === 'explainer'}
                  onClick={() => setSelectedType('explainer')}
                >
                  Explainer<span className="th-c" aria-hidden="true">{countByType('explainer')}</span>
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-type="build-note"
                  aria-pressed={selectedType === 'build-note'}
                  onClick={() => setSelectedType('build-note')}
                >
                  Build Note<span className="th-c" aria-hidden="true">{countByType('build-note')}</span>
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-type="evidence-note"
                  aria-pressed={selectedType === 'evidence-note'}
                  onClick={() => setSelectedType('evidence-note')}
                >
                  Evidence Note<span className="th-c" aria-hidden="true">{countByType('evidence-note')}</span>
                </button>
                <button
                  type="button"
                  className="th-f"
                  data-type="cxo-brief"
                  aria-pressed={selectedType === 'cxo-brief'}
                  onClick={() => setSelectedType('cxo-brief')}
                >
                  CXO Brief<span className="th-c" aria-hidden="true">{countByType('cxo-brief')}</span>
                </button>
              </div>
            </div>

            {/* Filter Status Bar */}
            <div className="th-fbar">
              <p className="th-status" id="fstatus" role="status" aria-live="polite">
                Showing {filteredPieces.length === 0 ? 0 : `${startIndex + 1}–${Math.min(endIndex, filteredPieces.length)}`} of {filteredPieces.length} pieces{totalPages > 1 ? ` (Page ${validCurrentPage} of ${totalPages})` : ''}
              </p>
              <button
                type="button"
                className="th-reset"
                id="freset"
                disabled={selectedTopic === 'all' && selectedType === 'all'}
                onClick={() => {
                  setSelectedTopic('all')
                  setSelectedType('all')
                }}
              >
                Show all
              </button>
            </div>
          </div>

          <p className="th-slate-note">
            <span className="th-phtag" style={{ flex: 'none' }}>
              Launch slate
            </span>
            <span>
              {blogs.length > 0
                ? `${blogs.length} piece${blogs.length === 1 ? '' : 's'} published live from Zuvvix Studio, followed by category foundational pieces in preparation.`
                : 'These pieces are in preparation, not yet published. Maturity labels describe the claims each piece is written to make.'}
            </span>
          </p>

          {/* Unified Articles Grid (DB blogs first, followed by existing pieces - Paginated to 9 per page) */}
          {filteredPieces.length === 0 ? (
            <div className="th-empty" id="fempty">
              <p>No pieces match this topic and type yet.</p>
              <p style={{ marginTop: '10px' }}>
                <button
                  type="button"
                  className="th-reset"
                  id="freset2"
                  onClick={() => {
                    setSelectedTopic('all')
                    setSelectedType('all')
                  }}
                >
                  Show all pieces
                </button>
              </p>
            </div>
          ) : (
            <>
              <div className="th-grid" id="grid">
                {paginatedPieces.map((item, idx) => {
                  const itemNumber = startIndex + idx + 1
                  return (
                    <article
                      key={item.key}
                      className={`th-card ${item.isPlaceholder ? 'th-ph' : ''}`}
                      id={`p${itemNumber}`}
                      data-topic={item.topicSlug}
                      data-type={item.typeSlug}
                      onClick={() => {
                        if (item.isDbBlog && item.dbBlog) {
                          const targetUrl = `/thinking/article/${item.dbBlog.slug || item.dbBlog.blog_id}/`
                          window.open(targetUrl, '_blank', 'noopener,noreferrer')
                        }
                      }}
                      style={item.isDbBlog ? { cursor: 'pointer' } : undefined}
                    >
                      {/* Cover Image if Available (for DB blogs) */}
                      {item.cover_image_url && (
                        <div className="th-card-cover-wrap">
                          <img
                            src={item.cover_image_url}
                            alt={item.title}
                            className="th-card-cover-img"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Top Bar with Type and Maturity */}
                      <div className="th-card-top">
                        <span className="th-type">{item.type}</span>
                        {item.isPlaceholder ? (
                          <span className="th-phtag">Editorial placeholder</span>
                        ) : item.isDbBlog ? (
                          <span className="th-mat m-demonstrated">
                            <i aria-hidden="true" />
                            <span className="sr">Claim maturity: </span>
                            Published
                          </span>
                        ) : (
                          <span className={`th-mat ${item.maturityClass}`}>
                            <i aria-hidden="true" />
                            <span className="sr">Claim maturity: </span>
                            {item.maturity}
                          </span>
                        )}
                      </div>

                      <h3 id={`t-${item.key}`}>{item.title}</h3>

                      <p className="th-dek">{item.excerpt}</p>

                      <p className="th-meta">
                        <span className="th-no">{String(itemNumber).padStart(2, '0')}</span>
                        <span>{item.topic}</span>
                        <span>{item.isDbBlog ? formatDate(item.createdAt) : item.status}</span>
                      </p>

                      {item.isDbBlog ? (
                        <a
                          href={`/thinking/article/${item.dbBlog?.slug || item.dbBlog?.blog_id}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="th-read-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Read piece →
                        </a>
                      ) : item.relUrl && item.relLabel ? (
                        <a className="th-rel" href={item.relUrl}>
                          <span className="sr">Related concept: </span>
                          {item.relLabel}
                        </a>
                      ) : null}
                    </article>
                  )
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <nav className="th-pagination" aria-label="Blog pagination">
                  <button
                    type="button"
                    className="th-pg-btn th-pg-prev"
                    disabled={validCurrentPage === 1}
                    onClick={() => goToPage(validCurrentPage - 1)}
                    aria-label="Previous page"
                  >
                    ← Previous
                  </button>

                  <div className="th-pg-numbers">
                    {getPageNumbers().map((num, i) =>
                      num === '...' ? (
                        <span key={`dots-${i}`} className="th-pg-ellipsis" aria-hidden="true">
                          …
                        </span>
                      ) : (
                        <button
                          key={`pg-${num}`}
                          type="button"
                          className={`th-pg-num ${num === validCurrentPage ? 'th-pg-active' : ''}`}
                          onClick={() => goToPage(Number(num))}
                          aria-label={`Go to page ${num}`}
                          aria-current={num === validCurrentPage ? 'page' : undefined}
                        >
                          {num}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    className="th-pg-btn th-pg-next"
                    disabled={validCurrentPage === totalPages}
                    onClick={() => goToPage(validCurrentPage + 1)}
                    aria-label="Next page"
                  >
                    Next →
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      {/* 04 BUILD / EVIDENCE STREAM */}
      <section className="sec tint" id="stream" aria-labelledby="h-stream">
        <div className="wrap">
          <div>
            <p className="kicker"><span className="idx">04</span><span className="label">Build &amp; evidence stream</span></p>
            <h2 className="h2" id="h-stream" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>
              Build notes and evidence arrive at the pace of the work.
            </h2>
            <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>
              Publish category thinking now. Add Build Notes and Evidence Notes only at the maturity state the underlying work supports.
            </p>
          </div>
          <ol className="th-stream" aria-label="Build and evidence stream">
            <li className="th-st">
              <span className="pt" aria-hidden="true"></span>
              <div className="bx">
                <div className="th-card-top">
                  <span className="th-type">Build Note · 10</span>
                  <span className="th-mat m-designed"><i aria-hidden="true"></i><span className="sr">Claim maturity: </span>Designed</span>
                </div>
                <h3>Designing Continuous Release Assurance around one critical journey</h3>
                <p>In preparation</p>
              </div>
            </li>
            <li className="th-st">
              <span className="pt" aria-hidden="true"></span>
              <div className="bx">
                <div className="th-card-top">
                  <span className="th-type">Build Note · 11</span>
                  <span className="th-mat m-designed"><i aria-hidden="true"></i><span className="sr">Claim maturity: </span>Designed</span>
                </div>
                <h3>What we learned by separating competence, authority and accountability</h3>
                <p>In preparation</p>
              </div>
            </li>
            <li className="th-st">
              <span className="pt" aria-hidden="true"></span>
              <div className="bx">
                <div className="th-card-top">
                  <span className="th-type">Evidence Note · 12</span>
                  <span className="th-phtag">Placeholder</span>
                </div>
                <h3>From designed to demonstrated: what evidence changed our confidence</h3>
                <p>Written only when the work reaches DEMONSTRATED.</p>
              </div>
            </li>
          </ol>
          <div className="th-ev">
            <div>
              <h3>Every Evidence Note must answer six questions.</h3>
              <ol className="th-six">
                <li>What was tested or observed?</li>
                <li>Under what conditions?</li>
                <li>What evidence exists?</li>
                <li>What failed or remained uncertain?</li>
                <li>What conclusion is justified?</li>
                <li>What conclusion is not justified?</li>
              </ol>
            </div>
            <div>
              <div className="th-eb">
                <div className="th-eb-top">
                  <b>Evidence Note Schema</b>
                  <span className="th-phtag">Structured format</span>
                </div>
                <dl>
                  <div><dt>Subject</dt><dd>Payment API / Order Service journey</dd></div>
                  <div><dt>Maturity</dt><dd>Demonstrated</dd></div>
                  <div><dt>Authority</dt><dd>Bounded release sign-off</dd></div>
                  <div><dt>Evidence</dt><dd>Execution trace + verification proof</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 ARTICLE ARCHITECTURE */}
      <section className="sec" id="architecture" aria-labelledby="h-arch">
        <div className="wrap">
          <div>
            <p className="kicker"><span className="idx">08</span><span className="label">Article architecture</span></p>
            <h2 className="h2" id="h-arch" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Every piece has a recognizable intellectual spine.</h2>
            <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Ten elements, in a fixed reading order. One dominant argument per piece, and one belief the reader should be able to repeat afterwards.</p>
          </div>
          <div className="th-arch">
            <div className="th-wire" role="img" aria-label="Wireframe of a Zuvvix article showing the ten elements in reading order, from title to footer call to action.">
              <div className="th-w" data-n="01"><span className="l t"></span><span className="l t2"></span></div>
              <div className="th-w" data-n="02"><span className="l" style={{ width: '92%' }}></span><span className="l" style={{ width: '70%' }}></span></div>
              <div className="th-w" data-n="03"><span className="box bel">Single buyer belief</span></div>
              <div className="th-w" data-n="04"><span className="l"></span><span className="l" style={{ width: '94%' }}></span><span className="l" style={{ width: '84%' }}></span></div>
              <div className="th-w" data-n="05"><span className="l" style={{ width: '40%', display: 'inline-block', marginRight: '6px' }}></span><u>Canonical term</u><span className="l" style={{ width: '76%' }}></span></div>
              <div className="th-w" data-n="06"><span className="box vis">Explanatory visual</span></div>
              <div className="th-w" data-n="07"><span className="box evb">Evidence / maturity block</span></div>
              <div className="th-w" data-n="08"><span className="l" style={{ width: '90%' }}></span><span className="l" style={{ width: '64%' }}></span></div>
              <div className="th-w" data-n="09"><span className="box rel">Related concept →</span></div>
              <div className="th-w" data-n="10"><span className="box cta">Follow the build</span></div>
            </div>
            <div>
              <ol className="th-alist">
                <li><span className="k">01</span><b>Title</b><span className="j">Express the idea, not the product feature.</span></li>
                <li><span className="k">02</span><b>Dek / opening tension</b><span className="j">Make the problem or question concrete in business language.</span></li>
                <li><span className="k">03</span><b>Single buyer belief</b><span className="j">One sentence the reader should be able to repeat after reading.</span></li>
                <li><span className="k">04</span><b>Argument / model</b><span className="j">Develop the reasoning with one dominant distinction or causal model.</span></li>
                <li><span className="k">05</span><b>Canonical vocabulary</b><span className="j">Use approved terms consistently; link the first meaningful occurrence to the concept page.</span></li>
                <li><span className="k">06</span><b>Visual</b><span className="j">Explain causality, contrast, evidence or authority—not decoration.</span></li>
                <li><span className="k">07</span><b>Evidence / maturity block</b><span className="j">Where material product or build claims appear, state maturity, scope, source and limitations.</span></li>
                <li><span className="k">08</span><b>Implication</b><span className="j">Translate the idea into what changes for quality leaders, engineering or executives.</span></li>
                <li><span className="k">09</span><b>Related concept</b><span className="j">One primary internal path to Category, System, Trust, Capability or Evidence.</span></li>
                <li><span className="k">10</span><b>Footer CTA</b><span className="j">Follow the build by default; design partnership only when the article has already established relevance.</span></li>
              </ol>
              <p className="th-order">Reading order: title → dek → metadata / maturity → article → related concept → CTA</p>
            </div>
          </div>
        </div>
      </section>

      {/* 09 IDEA-TO-CATEGORY LOOP */}
      <section className="sec tint" id="loop" aria-labelledby="h-loop">
        <div className="wrap">
          <div>
            <p className="kicker"><span className="idx">09</span><span className="label">Idea-to-category loop</span></p>
            <h2 className="h2" id="h-loop" style={{ maxWidth: 'none', fontSize: 'clamp(28px, 3.2vw, 44px)' }}>Thinking compounds when ideas connect to product truth and evidence.</h2>
            <p className="lede" style={{ marginTop: '20px', maxWidth: '78ch' }}>Editorial work sharpens shared language, makes product assumptions inspectable, publishes bounded evidence as it becomes available, and feeds valid learning back into future thinking.</p>
          </div>
          <ol className="th-loop" aria-label="Idea-to-category loop, seven steps that repeat">
            <li><span className="n">01</span><h3>Observe</h3><p>A real tension, failure, question or learning.</p></li>
            <li className="hl"><span className="n">02</span><h3>Reframe</h3><p>Explain the problem in a more useful way.</p></li>
            <li className="hl"><span className="n">03</span><h3>Name</h3><p>Attach precise Zuvvix vocabulary and distinctions.</p></li>
            <li className="hl"><span className="n">04</span><h3>Teach</h3><p>Publish the argument, model or explainer.</p></li>
            <li className="hl"><span className="n">05</span><h3>Connect</h3><p>Link to the canonical system, trust or capability page.</p></li>
            <li><span className="n">06</span><h3>Prove</h3><p>Add build or evidence notes as maturity increases.</p></li>
            <li><span className="n">07</span><h3>Learn</h3><p>Feed valid learning back into concepts and future work.</p></li>
            <li className="th-ret" aria-hidden="true"><span>↺ Back to observe</span></li>
          </ol>
          <p className="th-loopnote">The loop is not “content → leads.” It is insight → shared language → evidence → better understanding.</p>
        </div>
      </section>

      <section className="sec" aria-label="Final standard">
        <div className="wrap">
          <div className="th-final">
            <p style={{ maxWidth: 'none', lineHeight: 1.25, textWrap: 'balance', hyphens: 'none' }}>
              Zuvvix Thinking should teach the market how to reason about enterprise quality differently. If a piece could be published unchanged by any AI-testing vendor, it is not ready.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#follow">Follow the build</a>
              <a className="btn btn-quiet" href="/category/">Start with Outcome-Accountable Quality Operations</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
