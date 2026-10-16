// Blog API Client Service
// Integrates with backend /api/blogs and /api/upload routes connected to GoDaddy MySQL

import { blogAuthService } from './blogAuthService'

export interface BlogPayload {
  blog_id?: number | string
  title: string
  slug?: string
  excerpt?: string
  content: any
  cover_image_url?: string | null
  topic?: string
  type?: string
  tags?: string[]
  author_id?: number
}

export interface BlogItem {
  blog_id: number
  author_id: number | null
  title: string
  slug: string
  excerpt?: string | null
  content?: any
  cover_image_url?: string | null
  tags?: string[]
  topic?: string
  type?: string
  author_name?: string
  created_at: string
  updated_at?: string
  published_at?: string
}

export interface UploadImageResult {
  success: boolean
  url?: string
  filename?: string
  message?: string
}

function getAuthHeader(): Record<string, string> {
  const session = blogAuthService.getSession()
  const headers: Record<string, string> = {}
  if (session?.token) {
    headers['Authorization'] = `Bearer ${session.token}`
  }
  return headers
}

export const blogService = {
  // Fetch all blogs with optional filters
  async getBlogs(filters?: { search?: string; topic?: string; type?: string }): Promise<BlogItem[]> {
    try {
      const params = new URLSearchParams()
      if (filters?.search) params.append('search', filters.search)
      if (filters?.topic) params.append('topic', filters.topic)
      if (filters?.type) params.append('type', filters.type)

      const url = `/api/blogs${params.toString() ? `?${params.toString()}` : ''}`
      const response = await fetch(url, {
        headers: getAuthHeader(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch blogs (${response.status})`)
      }

      const result = await response.json()
      return Array.isArray(result.data) ? result.data : []
    } catch (err) {
      console.error('[blogService.getBlogs error]:', err)
      return []
    }
  },

  // Fetch single blog by ID or slug
  async getBlogById(idOrSlug: string | number): Promise<BlogItem | null> {
    try {
      const response = await fetch(`/api/blogs/${idOrSlug}`, {
        headers: getAuthHeader(),
      })

      if (!response.ok) {
        return null
      }

      const result = await response.json()
      return result.data || null
    } catch (err) {
      console.error('[blogService.getBlogById error]:', err)
      return null
    }
  },

  // Create a new blog
  async createBlog(payload: BlogPayload): Promise<{ success: boolean; data?: BlogItem; message?: string }> {
    try {
      const session = blogAuthService.getSession()
      const authorId = session?.id && typeof session.id === 'number' ? session.id : 1

      const body = {
        ...payload,
        author_id: authorId,
      }

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(body),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        return {
          success: false,
          message: result.message || 'Failed to create blog post.',
        }
      }

      return {
        success: true,
        data: result.data,
        message: result.message || 'Blog published successfully!',
      }
    } catch (err: any) {
      console.error('[blogService.createBlog error]:', err)
      return {
        success: false,
        message: err.message || 'Network error while creating blog post.',
      }
    }
  },

  // Update an existing blog
  async updateBlog(
    id: number | string,
    payload: Partial<BlogPayload>
  ): Promise<{ success: boolean; data?: BlogItem; message?: string }> {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        return {
          success: false,
          message: result.message || 'Failed to update blog post.',
        }
      }

      return {
        success: true,
        data: result.data,
        message: result.message || 'Blog updated successfully!',
      }
    } catch (err: any) {
      console.error('[blogService.updateBlog error]:', err)
      return {
        success: false,
        message: err.message || 'Network error while updating blog post.',
      }
    }
  },

  // Delete a blog
  async deleteBlog(id: number | string): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        return {
          success: false,
          message: result.message || 'Failed to delete blog post.',
        }
      }

      return {
        success: true,
        message: result.message || 'Blog deleted successfully.',
      }
    } catch (err: any) {
      console.error('[blogService.deleteBlog error]:', err)
      return {
        success: false,
        message: err.message || 'Network error while deleting blog post.',
      }
    }
  },

  // Upload image file to GoDaddy uploads directory (/public_html/zuvvix.com/uploads/blogs)
  async uploadImage(file: File): Promise<UploadImageResult> {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: getAuthHeader(), // Browser will automatically set multipart boundary for FormData
        body: formData,
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        return {
          success: false,
          message: result.message || 'Image upload failed.',
        }
      }

      return {
        success: true,
        url: result.url,
        filename: result.filename,
      }
    } catch (err: any) {
      console.error('[blogService.uploadImage error]:', err)
      return {
        success: false,
        message: err.message || 'Network error during image upload.',
      }
    }
  },
}

