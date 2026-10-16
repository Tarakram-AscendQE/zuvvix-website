// Blog Model and Database Interfaces
// Aligns directly with GoDaddy MySQL `blogs` table

export interface IBlogRow {
  blog_id: number
  author_id: number | null
  title: string
  slug: string
  excerpt: string | null
  content: string // Stored as JSON string (LONGTEXT) in MySQL
  cover_image_url: string | null
  tags: string | null // Stored as JSON string (LONGTEXT) in MySQL
  created_at: string
  updated_at: string
  published_at: string
  author_name?: string
}

export interface IBlogResponse {
  blog_id: number
  author_id: number | null
  title: string
  slug: string
  excerpt: string | null
  content: any // Parsed JSON object
  cover_image_url: string | null
  tags: string[]
  topic?: string
  type?: string
  created_at: string
  updated_at: string
  published_at: string
  author_name: string
}

export interface ICreateBlogDTO {
  title: string
  slug?: string
  excerpt?: string
  content: any
  cover_image_url?: string | null
  topic?: string
  type?: string
  tags?: string[] | string
  author_id?: number
}

export interface IUpdateBlogDTO {
  title?: string
  slug?: string
  excerpt?: string
  content?: any
  cover_image_url?: string | null
  topic?: string
  type?: string
  tags?: string[] | string
}

