// Article / Blog Post Model & Repository

export interface IArticle {
  id: string
  slug: string
  title: string
  content: string
  coverImage?: string | null
  blurb?: string
  tags?: string[]
  author: {
    username: string
    displayName: string
  }
  status: 'draft' | 'published'
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
}

// In-memory store for development/preview
export const articlesStore: IArticle[] = []

