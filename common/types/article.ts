// Common Article / Blog Post Types

export type ArticleStatus = 'draft' | 'saving' | 'saved' | 'published' | 'archived'

export interface ArticleAuthor {
  id?: string
  username: string
  displayName: string
  avatar?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  content: string // HTML or Tiptap JSON
  coverImage?: string | null
  blurb?: string
  tags?: string[]
  author: ArticleAuthor
  status: ArticleStatus
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
}

export interface ArticlePublishPayload {
  title: string
  content: string
  coverImage?: string | null
  blurb?: string
  tags?: string[]
}

