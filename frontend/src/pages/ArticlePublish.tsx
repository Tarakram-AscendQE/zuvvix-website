import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapLink from '@tiptap/extension-link'
import TiptapImage from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import { toast } from 'sonner'
import { blogService, BlogPayload } from '@/services/blogService'
import '@/styles/pages/article-publish.css'

export const TOPIC_OPTIONS = [
  'Category',
  'System',
  'Trust',
  'Continuous Release Assurance',
  'Build Notes',
  'Evidence',
] as const

export const TYPE_OPTIONS = [
  'Category Essay',
  'Explainer',
  'Build Note',
  'Evidence Note',
  'CXO Brief',
] as const

interface ArticlePublishProps {
  onLogout?: () => void
  onBackToDashboard?: () => void
  initialBlog?: any
  initialReadOnly?: boolean
}

export function ArticlePublish({ onLogout, onBackToDashboard, initialBlog, initialReadOnly }: ArticlePublishProps = {}) {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(Boolean(initialReadOnly))
  const [title, setTitle] = useState<string>(initialBlog?.title || '')
  const [coverImage, setCoverImage] = useState<string | null>(initialBlog?.cover_image_url || null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [blurb, setBlurb] = useState<string>(initialBlog?.excerpt || '')
  const [topic, setTopic] = useState<string>(
    initialBlog?.topic || initialBlog?.content?.topic || initialBlog?.tags?.topic || ''
  )
  const [type, setType] = useState<string>(
    initialBlog?.type || initialBlog?.content?.blogType || initialBlog?.content?.type || initialBlog?.tags?.type || ''
  )
  const [isUploadingCover, setIsUploadingCover] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  // Formatting Toolbar States
  const [isStyleOpen, setIsStyleOpen] = useState(false)

  // Emoji Picker State
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  // Add Link Modal States
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [linkText, setLinkText] = useState('')
  const [linkUrl, setLinkUrl] = useState('')

  const coverFileInputRef = useRef<HTMLInputElement>(null)
  const bodyImageInputRef = useRef<HTMLInputElement>(null)
  const titleInputRef = useRef<HTMLTextAreaElement>(null)
  const styleDropdownRef = useRef<HTMLDivElement>(null)

  // Tiptap Rich Text Editor Setup
  const editor = useEditor({
    editable: !initialReadOnly,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'art-editor-link',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      TiptapImage.configure({
        HTMLAttributes: {
          class: 'art-editor-inline-img',
        },
      }),
      Placeholder.configure({
        placeholder: 'Write here. You can also include @mentions.',
      }),
    ],
    content: initialBlog?.content || '',
  })

  // Synchronize read-only mode with editor
  useEffect(() => {
    setIsReadOnly(Boolean(initialReadOnly))
    if (editor) {
      editor.setEditable(!initialReadOnly)
    }
  }, [initialReadOnly, editor])

  // Auto-resize title textarea height
  const adjustHeight = (el: HTMLTextAreaElement | null) => {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  useEffect(() => {
    adjustHeight(titleInputRef.current)
  }, [title])

  // Close dropdown or emoji picker on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (styleDropdownRef.current && !styleDropdownRef.current.contains(e.target as Node)) {
        setIsStyleOpen(false)
      }
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) {
        setIsEmojiOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close modals or popovers on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isEmojiOpen) {
          setIsEmojiOpen(false)
        } else if (isLinkModalOpen) {
          setIsLinkModalOpen(false)
        } else if (isModalOpen) {
          setIsModalOpen(false)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isEmojiOpen, isLinkModalOpen, isModalOpen])

  // Cover Image Handlers
  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WebP, etc.)')
      return
    }

    setIsUploadingCover(true)
    const toastId = toast.loading('Uploading cover image...')
    try {
      const res = await blogService.uploadImage(file)
      toast.dismiss(toastId)
      if (res.success && res.url) {
        setCoverImage(res.url)
        toast.success('Cover image uploaded successfully')
      } else {
        toast.error(res.message || 'Failed to upload cover image')
      }
    } catch (err: any) {
      toast.dismiss(toastId)
      toast.error('Error uploading cover image: ' + err.message)
    } finally {
      setIsUploadingCover(false)
      if (coverFileInputRef.current) {
        coverFileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveCover = () => {
    setCoverImage(null)
    if (coverFileInputRef.current) {
      coverFileInputRef.current.value = ''
    }
    toast.info('Cover image removed')
  }

  // Inline Image Upload Handler for Article Body
  const handleBodyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, WebP, etc.)')
      return
    }

    const toastId = toast.loading('Uploading inline image...')
    try {
      const res = await blogService.uploadImage(file)
      toast.dismiss(toastId)
      if (res.success && res.url) {
        editor.chain().focus().setImage({ src: res.url, alt: file.name || 'Article image' }).run()
        toast.success('Image added to article')
      } else {
        toast.error(res.message || 'Failed to upload image')
      }
    } catch (err: any) {
      toast.dismiss(toastId)
      toast.error('Error uploading image: ' + err.message)
    } finally {
      if (bodyImageInputRef.current) {
        bodyImageInputRef.current.value = ''
      }
    }
  }

  // Current active heading / style determination
  const getSelectedStyle = () => {
    if (!editor) return 'Normal'
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1'
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2'
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3'
    return 'Normal'
  }
  const selectedStyle = getSelectedStyle()

  const handleSelectStyle = (style: string) => {
    setIsStyleOpen(false)
    if (!editor) return

    if (style === 'Heading 1') {
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    } else if (style === 'Heading 2') {
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    } else if (style === 'Heading 3') {
      editor.chain().focus().toggleHeading({ level: 3 }).run()
    } else {
      editor.chain().focus().setParagraph().run()
    }
  }

  // Link Modal Handlers
  const handleOpenLinkModal = () => {
    if (!editor) return
    if (editor.isActive('link')) {
      const href = editor.getAttributes('link').href || ''
      setLinkUrl(href)
      const { from, to } = editor.state.selection
      const selected = editor.state.doc.textBetween(from, to, ' ')
      setLinkText(selected || href)
    } else {
      const { from, to } = editor.state.selection
      const selected = editor.state.doc.textBetween(from, to, ' ')
      setLinkText(selected)
      setLinkUrl('')
    }
    setIsLinkModalOpen(true)
  }

  const handleApplyLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!editor || !linkText.trim() || !linkUrl.trim()) return

    let formattedUrl = linkUrl.trim()
    if (!/^https?:\/\//i.test(formattedUrl) && !/^mailto:/i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`
    }

    const { from, to } = editor.state.selection
    const selected = editor.state.doc.textBetween(from, to, ' ')

    if (selected.trim() !== linkText.trim()) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .insertContent({
          type: 'text',
          text: linkText.trim(),
          marks: [
            {
              type: 'link',
              attrs: { href: formattedUrl, target: '_blank', class: 'art-editor-link' },
            },
          ],
        })
        .run()
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: formattedUrl })
        .run()
    }

    setIsLinkModalOpen(false)
    setLinkText('')
    setLinkUrl('')
    toast.success('Link applied')
  }

  const handleRemoveLink = () => {
    if (!editor) return
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setIsLinkModalOpen(false)
    setLinkText('')
    setLinkUrl('')
    toast.info('Link removed')
  }

  /* COMMENTED OUT FOR FUTURE USE: Ready to publish popup modal trigger
  const handleOpenPublishModal = () => {
    const textContent = editor?.getText().trim() || ''
    if (!title.trim() && !textContent) {
      toast.warning('Please enter a title or write some content before publishing.')
      return
    }
    if (!topic) {
      toast.warning('Please select a Topic from the dropdown on the left.')
      return
    }
    if (!type) {
      toast.warning('Please select a Type from the dropdown on the left.')
      return
    }
    setIsEmojiOpen(false)
    setIsModalOpen(true)
  }
  */

  // Direct Publish / Update Handler (executed directly from the top bar Publish button)
  const handlePublish = async () => {
    if (isPublishing) return

    const textContent = editor?.getText().trim() || ''
    if (!title.trim() && !textContent) {
      toast.warning('Please enter a title or write some content before publishing.')
      return
    }
    if (!topic) {
      toast.warning('Please select a Topic from the dropdown on the left.')
      return
    }
    if (!type) {
      toast.warning('Please select a Type from the dropdown on the left.')
      return
    }

    const editorJson = editor?.getJSON() || {}
    const hashtags = (blurb.match(/#[a-zA-Z0-9_]+/g) || []).map((t) => t.replace('#', ''))
    const autoExcerpt = blurb.trim() || textContent.slice(0, 160) || undefined

    const payload: BlogPayload = {
      title: title.trim(),
      excerpt: autoExcerpt,
      content: editorJson,
      cover_image_url: coverImage || null,
      topic,
      type,
      tags: hashtags,
    }

    setIsPublishing(true)
    try {
      if (initialBlog?.blog_id) {
        const res = await blogService.updateBlog(initialBlog.blog_id, payload)
        if (res.success) {
          toast.success('Article updated successfully!')
          setIsModalOpen(false)
          setIsEmojiOpen(false)
          if (onBackToDashboard) {
            setTimeout(() => onBackToDashboard(), 500)
          }
        } else {
          toast.error(res.message || 'Failed to update article.')
        }
      } else {
        const res = await blogService.createBlog(payload)
        if (res.success) {
          toast.success('Article published to Zuvvix Thinking stream!')
          setIsModalOpen(false)
          setIsEmojiOpen(false)
          if (onBackToDashboard) {
            setTimeout(() => onBackToDashboard(), 500)
          }
        } else {
          toast.error(res.message || 'Failed to publish article.')
        }
      }
    } catch (err: any) {
      toast.error('Failed to save article: ' + err.message)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setBlurb((prev) => prev + emojiData.emoji)
  }

  return (
    <div className="art-editor-root">
      {/* Top Header Navigation */}
      <header className="art-topbar">
        <div className="art-topbar-left">
          {onBackToDashboard ? (
            <button
              type="button"
              className="art-back-btn"
              onClick={onBackToDashboard}
              title="Back to Blog Dashboard"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Blogs
            </button>
          ) : (
            <Link to="/thinking/" className="art-back-btn" title="Back to Thinking">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Exit editor
            </Link>
          )}
          <span className="art-brand-badge">Zuvvix Studio</span>
          {isReadOnly && (
            <span className="art-readonly-pill">
              Read-only Mode
            </span>
          )}
        </div>

        <div className="art-topbar-right">
          {/* COMMENTED OUT FOR FUTURE USE: Next button that opened the Ready to Publish popup modal
          <button
            type="button"
            className="art-publish-trigger-btn"
            onClick={handleOpenPublishModal}
          >
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          */}

          {/* When in Read-only mode, display Edit button to switch directly to editing */}
          {isReadOnly ? (
            <button
              type="button"
              className="art-publish-trigger-btn art-edit-toggle-btn"
              onClick={() => {
                setIsReadOnly(false)
                editor?.setEditable(true)
                toast.success('Editing enabled. You can now modify and update this article.')
              }}
              title="Click to edit this article"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
          ) : (
            <button
              type="button"
              className="art-publish-trigger-btn"
              onClick={handlePublish}
              disabled={isPublishing}
            >
              {isPublishing
                ? (initialBlog?.blog_id ? 'Updating...' : 'Publishing...')
                : (initialBlog?.blog_id ? 'Update' : 'Publish')}
            </button>
          )}

          {onLogout && (
            <button
              type="button"
              className="art-logout-btn"
              title="Sign out of Zuvvix Studio"
              onClick={onLogout}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          )}
        </div>
      </header>

      {/* Editor Workspace Container with Left Sidebar */}
      <div className="art-layout-wrap">
        {/* Left Sidebar: Topic & Type Dropdowns */}
        <aside className="art-sidebar-panel" aria-label="Blog Settings">
          <div className="art-sidebar-card">
            <div className="art-sidebar-heading">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <span>Blog Metadata</span>
            </div>

            {/* Dropdown 1: Topic */}
            <div className="art-meta-field">
              <label className="art-meta-label" htmlFor="art-topic-select">
                Topic
              </label>
              <div className="art-select-wrap">
                <select
                  id="art-topic-select"
                  className={`art-meta-select ${isReadOnly ? 'readonly' : ''}`}
                  value={topic}
                  disabled={isReadOnly}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value="">Select Topic</option>
                  {TOPIC_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <span className="art-select-chevron">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Dropdown 2: Type */}
            <div className="art-meta-field">
              <label className="art-meta-label" htmlFor="art-type-select">
                Type
              </label>
              <div className="art-select-wrap">
                <select
                  id="art-type-select"
                  className={`art-meta-select ${isReadOnly ? 'readonly' : ''}`}
                  value={type}
                  disabled={isReadOnly}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <span className="art-select-chevron">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Authoring Workspace Canvas */}
        <main className="art-main-wrap">
        {/* Hidden Inputs for File Selection */}
        <input
          ref={coverFileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleCoverImageUpload}
        />
        <input
          ref={bodyImageInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleBodyImageUpload}
        />

        {/* Rich Formatting Toolbar (LinkedIn Floating Pill Bar) */}
        {editor && !isReadOnly && (
          <div className="art-format-toolbar" role="toolbar" aria-label="Text formatting">
            {/* Style Dropdown */}
            <div className="art-tb-dropdown-wrap" ref={styleDropdownRef}>
              <button
                type="button"
                className={`art-tb-dropdown-btn ${selectedStyle !== 'Normal' || isStyleOpen ? 'active' : ''}`}
                data-tooltip="Style"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setIsStyleOpen((prev) => !prev)}
              >
                <span>{selectedStyle}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {isStyleOpen && (
                <div className="art-tb-dropdown-menu">
                  <button
                    type="button"
                    className={`art-tb-dropdown-item ${selectedStyle === 'Normal' ? 'active' : ''}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectStyle('Normal')}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    className={`art-tb-dropdown-item ${selectedStyle === 'Heading 1' ? 'active' : ''}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectStyle('Heading 1')}
                  >
                    Heading 1
                  </button>
                  <button
                    type="button"
                    className={`art-tb-dropdown-item ${selectedStyle === 'Heading 2' ? 'active' : ''}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectStyle('Heading 2')}
                  >
                    Heading 2
                  </button>
                  <button
                    type="button"
                    className={`art-tb-dropdown-item ${selectedStyle === 'Heading 3' ? 'active' : ''}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelectStyle('Heading 3')}
                  >
                    Heading 3
                  </button>
                </div>
              )}
            </div>

            <div className="art-tb-sep" aria-hidden="true" />

            {/* Bold */}
            <button
              type="button"
              className={`art-tb-btn ${editor.isActive('bold') ? 'active' : ''}`}
              data-tooltip="Bold"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <span style={{ fontWeight: 700, fontFamily: 'serif', fontSize: '15px' }}>B</span>
            </button>

            {/* Italic */}
            <button
              type="button"
              className={`art-tb-btn ${editor.isActive('italic') ? 'active' : ''}`}
              data-tooltip="Italic"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <span style={{ fontStyle: 'italic', fontFamily: 'serif', fontSize: '15px' }}>I</span>
            </button>

            {/* Bullet List */}
            <button
              type="button"
              className={`art-tb-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
              data-tooltip="Bullet list"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                <circle cx="4" cy="18" r="1.5" fill="currentColor" />
              </svg>
            </button>

            {/* Numbered List */}
            <button
              type="button"
              className={`art-tb-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
              data-tooltip="Numbered list"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="10" y1="6" x2="21" y2="6" />
                <line x1="10" y1="12" x2="21" y2="12" />
                <line x1="10" y1="18" x2="21" y2="18" />
                <path d="M4 7V4h1M4 14h2M4 11h2v3M4 18h2v3H4" />
              </svg>
            </button>

            {/* Quote */}
            <button
              type="button"
              className={`art-tb-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
              data-tooltip="Quote"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </button>

            {/* Code Block */}
            <button
              type="button"
              className={`art-tb-btn ${editor.isActive('codeBlock') ? 'active' : ''}`}
              data-tooltip="Code block"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <span style={{ fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: 600 }}>{'{ }'}</span>
            </button>

            {/* Divider */}
            <button
              type="button"
              className="art-tb-btn"
              data-tooltip="Divider"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="12" x2="21" y2="12" />
              </svg>
            </button>

            <div className="art-tb-sep" aria-hidden="true" />

            {/* Link */}
            <button
              type="button"
              className={`art-tb-btn ${editor.isActive('link') || isLinkModalOpen ? 'active' : ''}`}
              data-tooltip="Link"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleOpenLinkModal}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>


            {/* Image */}
            <button
              type="button"
              className={`art-tb-btn ${editor.isActive('image') ? 'active' : ''}`}
              data-tooltip="Add image"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => bodyImageInputRef.current?.click()}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </button>
          </div>
        )}

        {/* Step 1: Cover Image Box */}
        {!coverImage ? (
          !isReadOnly && (
            <div
              className="art-cover-box empty"
              onClick={() => coverFileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  coverFileInputRef.current?.click()
                }
              }}
            >
              <div className="art-cover-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </div>
              <p className="art-cover-text">
                {isUploadingCover ? 'Uploading cover image to server...' : 'Add a cover image to your article.'}
              </p>
              <button
                type="button"
                className="art-upload-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  coverFileInputRef.current?.click()
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
                Upload from computer
              </button>
            </div>
          )
        ) : (
          <div className="art-cover-box art-cover-preview-wrapper">
            <img src={coverImage} alt="Cover preview" className="art-cover-img" />
            {!isReadOnly && (
              <div className="art-cover-actions">
                <button
                  type="button"
                  className="art-cover-act-btn"
                  onClick={() => coverFileInputRef.current?.click()}
                >
                  Change image
                </button>
                <button
                  type="button"
                  className="art-cover-act-btn remove"
                  onClick={handleRemoveCover}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}

        {/* Title Area */}
        <textarea
          ref={titleInputRef}
          className={`art-title-input ${isReadOnly ? 'readonly' : ''}`}
          placeholder={isReadOnly ? '' : 'Title'}
          rows={1}
          value={title}
          readOnly={isReadOnly}
          onChange={(e) => setTitle(e.target.value)}
          style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
        />

        {/* Article Body Area (Tiptap Engine) */}
        <div className="art-body-editable">
          <EditorContent editor={editor} />
        </div>
      </main>
    </div>

      {/* =========================================================================
          COMMENTED OUT FOR FUTURE USE: Ready to publish popup modal
          (The blog is now published directly from the top bar Publish button)
          =========================================================================
      {isModalOpen && (
        <div className="art-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="art-modal-box"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="artModalHeading"
          >
            <!-- Modal Header -->
            <div className="art-modal-header">
              <span id="artModalHeading" className="art-modal-title">Ready to publish</span>
              <button
                type="button"
                className="art-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <!-- Modal Body -->
            <div className="art-modal-body">
              <!-- Feed Blurb Textarea -->
              <textarea
                className="art-blurb-textarea art-modal-textarea"
                placeholder="What do you want to talk about?"
                rows={5}
                value={blurb}
                onChange={(e) => setBlurb(e.target.value)}
                autoFocus
              />
            </div>

            <!-- Modal Footer -->
            <div className="art-modal-footer">
              <div className="art-modal-tools">
                <div className="art-emoji-picker-wrap" ref={emojiPickerRef}>
                  <button
                    type="button"
                    className={`art-tool-btn ${isEmojiOpen ? 'active' : ''}`}
                    title="Add emoji"
                    aria-label="Add emoji"
                    onClick={() => setIsEmojiOpen((prev) => !prev)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  </button>

                  {isEmojiOpen && (
                    <div className="art-emoji-popover">
                      <EmojiPicker
                        onEmojiClick={handleEmojiSelect}
                        autoFocusSearch={false}
                        theme={Theme.LIGHT}
                        width={320}
                        height={360}
                        searchPlaceHolder="Search emoji..."
                        previewConfig={{ showPreview: false }}
                        lazyLoadEmojis={true}
                      />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="art-tool-btn"
                  title="Add hashtag"
                  onClick={() => setBlurb((p) => (p ? `${p} #` : '#'))}
                >
                  #
                </button>
                <button
                  type="button"
                  className="art-tool-btn"
                  title="Mention someone"
                  onClick={() => setBlurb((p) => (p ? `${p} @` : '@'))}
                >
                  @
                </button>
              </div>

              <button
                type="button"
                className="art-modal-publish-btn"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing
                  ? (initialBlog?.blog_id ? 'Updating...' : 'Publishing...')
                  : (initialBlog?.blog_id ? 'Update' : 'Publish')}
              </button>
            </div>
          </div>
        </div>
      )}
      ========================================================================= */}

      {/* Add / Edit Link Popup Modal */}
      {isLinkModalOpen && (
        <div className="art-link-popup-overlay" onClick={() => setIsLinkModalOpen(false)}>
          <div
            className="art-link-popup"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="artLinkHeading"
          >
            <h3 id="artLinkHeading" className="art-link-title">
              {editor?.isActive('link') ? 'Edit link' : 'Add link'}
            </h3>

            <div className="art-link-field">
              <label className="art-link-label" htmlFor="art-link-text-input">
                Text*
              </label>
              <textarea
                id="art-link-text-input"
                className="art-link-textarea"
                placeholder="Add text here"
                rows={2}
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                autoFocus
              />
            </div>

            <div className="art-link-field">
              <label className="art-link-label" htmlFor="art-link-url-input">
                Link*
              </label>
              <input
                id="art-link-url-input"
                type="text"
                className="art-link-input"
                placeholder="Paste link here"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && linkText.trim() && linkUrl.trim()) {
                    e.preventDefault()
                    handleApplyLink()
                  }
                }}
              />
            </div>

            <div className="art-link-actions">
              {editor?.isActive('link') && (
                <button
                  type="button"
                  className="art-link-remove-btn"
                  onClick={handleRemoveLink}
                  style={{
                    marginRight: 'auto',
                    background: 'transparent',
                    border: 'none',
                    color: '#dc2626',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: '6px 0',
                  }}
                >
                  Remove link
                </button>
              )}
              <button
                type="button"
                className="art-link-cancel-btn"
                onClick={() => setIsLinkModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`art-link-apply-btn ${linkText.trim() && linkUrl.trim() ? 'active' : ''}`}
                disabled={!linkText.trim() || !linkUrl.trim()}
                onClick={() => handleApplyLink()}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
