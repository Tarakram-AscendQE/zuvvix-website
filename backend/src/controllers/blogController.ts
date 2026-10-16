// Blog Controller
// Handles full CRUD operations on GoDaddy MySQL `blogs` table using parameterized queries

import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express'
import { pool } from '../config/database.js'
import { config } from '../config/index.js'
import {
  IBlogRow,
  IBlogResponse,
  ICreateBlogDTO,
  IUpdateBlogDTO,
} from '../models/Blog.js'

// Helper: Safely delete an uploaded image file by filename from upload directory
async function deleteUploadedFile(filename: string): Promise<boolean> {
  try {
    const safeFilename = path.basename(filename)
    if (!safeFilename) return false

    const filePath = path.join(config.uploadDir, safeFilename)
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath)
      console.log(`[Blog Cleanup] Deleted image file: ${filePath}`)
      return true
    }
  } catch (err: any) {
    console.error(`[Blog Cleanup] Failed to delete image file ${filename}:`, err.message)
  }
  return false
}

// Helper: Extract all local /uploads/blogs/ filenames from a blog's cover and content
function extractBlogImageFilenames(coverImageUrl?: string | null, content?: any): string[] {
  const filenames = new Set<string>()

  // 1. Check cover_image_url
  if (coverImageUrl && typeof coverImageUrl === 'string') {
    if (coverImageUrl.includes('/uploads/blogs/')) {
      const match = coverImageUrl.match(/\/uploads\/blogs\/([a-zA-Z0-9_\-\.]+\.(?:png|jpe?g|webp|gif|svg))/i)
      if (match && match[1]) {
        filenames.add(path.basename(match[1]))
      } else {
        const base = path.basename(coverImageUrl.split('?')[0])
        if (base && /\.(png|jpe?g|webp|gif|svg)$/i.test(base)) {
          filenames.add(base)
        }
      }
    }
  }

  // 2. Check content (whether JSON object or string)
  if (content) {
    try {
      const contentStr = typeof content === 'string' ? content : JSON.stringify(content)
      const matches = contentStr.matchAll(/\/uploads\/blogs\/([a-zA-Z0-9_\-\.]+\.(?:png|jpe?g|webp|gif|svg))/gi)
      for (const m of matches) {
        if (m[1]) {
          filenames.add(path.basename(m[1]))
        }
      }
    } catch {
      // Ignore serialization issues
    }
  }

  return Array.from(filenames)
}

// Helper: Slugify string
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with single dash
    .replace(/^-+|-+$/g, '') // Trim dashes from start and end
}

// Helper: Ensure slug is unique in `blogs` table
async function getUniqueSlug(baseSlug: string, excludeBlogId?: number): Promise<string> {
  if (!pool) return baseSlug

  let candidate = baseSlug || `blog-${Date.now()}`
  let counter = 1

  while (true) {
    let query = 'SELECT blog_id FROM blogs WHERE slug = ?'
    const params: any[] = [candidate]

    if (excludeBlogId) {
      query += ' AND blog_id != ?'
      params.push(excludeBlogId)
    }

    query += ' LIMIT 1'

    const [rows]: any = await pool.execute(query, params)
    if (!rows || rows.length === 0) {
      return candidate
    }

    const suffix = Math.random().toString(36).substring(2, 6)
    candidate = `${baseSlug}-${suffix}`
    counter++
    if (counter > 10) {
      candidate = `${baseSlug}-${Date.now()}`
      return candidate
    }
  }
}

// Helper: Format raw MySQL row into client-friendly blog object
function parseBlogRow(row: IBlogRow): IBlogResponse {
  let parsedContent: any = null
  let topic = ''
  let type = ''

  if (row.content) {
    if (typeof row.content === 'object') {
      parsedContent = row.content
    } else {
      try {
        parsedContent = JSON.parse(row.content)
      } catch {
        parsedContent = row.content
      }
    }

    if (parsedContent && typeof parsedContent === 'object') {
      topic = parsedContent.topic || ''
      type = parsedContent.blogType || parsedContent.type || ''
    }
  }

  let parsedTags: string[] = []
  if (row.tags) {
    if (Array.isArray(row.tags)) {
      parsedTags = row.tags
    } else {
      try {
        const decoded = JSON.parse(row.tags)
        if (Array.isArray(decoded)) {
          parsedTags = decoded
        }
      } catch {
        parsedTags = typeof row.tags === 'string' ? [row.tags] : []
      }
    }
  }

  return {
    blog_id: Number(row.blog_id),
    author_id: row.author_id ? Number(row.author_id) : null,
    title: row.title || '',
    slug: row.slug || '',
    excerpt: row.excerpt || '',
    content: parsedContent,
    cover_image_url: row.cover_image_url || null,
    tags: parsedTags,
    topic,
    type,
    created_at: row.created_at,
    updated_at: row.updated_at,
    published_at: row.published_at,
    author_name: row.author_name || 'Admin',
  }
}

// 1. GET /api/blogs (List all blogs)
export async function getBlogs(req: Request, res: Response): Promise<void> {
  if (!pool) {
    res.status(503).json({
      success: false,
      message: 'Database connection is unavailable.',
      timestamp: Date.now(),
    })
    return
  }

  try {
    const { search, topic, type } = req.query

    let sql = `
      SELECT 
        b.blog_id,
        b.author_id,
        b.title,
        b.slug,
        b.excerpt,
        b.content,
        b.cover_image_url,
        b.tags,
        b.created_at,
        b.updated_at,
        b.published_at,
        COALESCE(u.username, 'Admin') AS author_name
      FROM blogs b
      LEFT JOIN admin_users u ON b.author_id = u.user_id
    `

    const whereClauses: string[] = []
    const params: any[] = []

    if (search && typeof search === 'string' && search.trim()) {
      const term = `%${search.trim().toLowerCase()}%`
      whereClauses.push('(LOWER(b.title) LIKE ? OR LOWER(b.slug) LIKE ? OR LOWER(b.excerpt) LIKE ?)')
      params.push(term, term, term)
    }

    if (whereClauses.length > 0) {
      sql += ' WHERE ' + whereClauses.join(' AND ')
    }

    sql += ' ORDER BY b.created_at DESC'

    const [rows]: any = await pool.execute(sql, params)
    let items: IBlogResponse[] = (rows || []).map(parseBlogRow)

    // Optional topic/type filters
    if (topic && typeof topic === 'string') {
      items = items.filter((item) => item.topic?.toLowerCase() === topic.toLowerCase())
    }
    if (type && typeof type === 'string') {
      items = items.filter((item) => item.type?.toLowerCase() === type.toLowerCase())
    }

    res.status(200).json({
      success: true,
      data: items,
      total: items.length,
      timestamp: Date.now(),
    })
  } catch (err: any) {
    console.error('[Blog Controller - getBlogs Error]:', err)
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch blogs from database.',
      timestamp: Date.now(),
    })
  }
}

// 2. GET /api/blogs/:idOrSlug (Get single blog)
export async function getBlogByIdOrSlug(req: Request, res: Response): Promise<void> {
  if (!pool) {
    res.status(503).json({
      success: false,
      message: 'Database connection is unavailable.',
      timestamp: Date.now(),
    })
    return
  }

  try {
    const idOrSlug = String(req.params.idOrSlug || '')
    const isNumeric = /^\d+$/.test(idOrSlug)

    let sql = `
      SELECT 
        b.blog_id,
        b.author_id,
        b.title,
        b.slug,
        b.excerpt,
        b.content,
        b.cover_image_url,
        b.tags,
        b.created_at,
        b.updated_at,
        b.published_at,
        COALESCE(u.username, 'Admin') AS author_name
      FROM blogs b
      LEFT JOIN admin_users u ON b.author_id = u.user_id
    `

    if (isNumeric) {
      sql += ' WHERE b.blog_id = ? LIMIT 1'
    } else {
      sql += ' WHERE b.slug = ? LIMIT 1'
    }

    const [rows]: any = await pool.execute(sql, [isNumeric ? Number(idOrSlug) : idOrSlug])

    if (!rows || rows.length === 0) {
      res.status(404).json({
        success: false,
        message: `Blog "${idOrSlug}" not found.`,
        timestamp: Date.now(),
      })
      return
    }

    const blog = parseBlogRow(rows[0])
    res.status(200).json({
      success: true,
      data: blog,
      timestamp: Date.now(),
    })
  } catch (err: any) {
    console.error('[Blog Controller - getBlogByIdOrSlug Error]:', err)
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to fetch blog details.',
      timestamp: Date.now(),
    })
  }
}

// 3. POST /api/blogs (Create blog)
export async function createBlog(req: Request, res: Response): Promise<void> {
  if (!pool) {
    res.status(503).json({
      success: false,
      message: 'Database connection is unavailable.',
      timestamp: Date.now(),
    })
    return
  }

  try {
    const body: ICreateBlogDTO = req.body || {}
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      cover_image_url,
      topic,
      type,
      tags,
      author_id,
    } = body

    if (!title || !String(title).trim()) {
      res.status(400).json({
        success: false,
        message: 'Blog title is required.',
        timestamp: Date.now(),
      })
      return
    }

    const cleanTitle = String(title).trim()
    const rawSlug = customSlug && String(customSlug).trim()
      ? slugify(customSlug)
      : slugify(cleanTitle)

    const finalSlug = await getUniqueSlug(rawSlug)

    // Build structured content JSON
    let contentObj: any = content || {}
    if (typeof contentObj === 'string') {
      try {
        contentObj = JSON.parse(contentObj)
      } catch {
        contentObj = { type: 'doc', content: [{ type: 'paragraph', text: contentObj }] }
      }
    }

    if (typeof contentObj === 'object' && contentObj !== null) {
      if (topic) contentObj.topic = topic
      if (type) contentObj.blogType = type
    }

    const contentJson = JSON.stringify(contentObj)

    // Process tags
    const tagList: string[] = []
    if (Array.isArray(tags)) {
      tagList.push(...tags.map(String))
    } else if (tags && typeof tags === 'string') {
      tagList.push(tags)
    }
    if (topic && !tagList.includes(topic)) tagList.push(topic)
    if (type && !tagList.includes(type)) tagList.push(type)
    const tagsJson = JSON.stringify(tagList)

    const finalAuthorId = author_id && Number(author_id) > 0 ? Number(author_id) : 1
    const cleanExcerpt = excerpt ? String(excerpt).trim() : null
    const cleanCoverUrl = cover_image_url ? String(cover_image_url).trim() : null

    // Parameterized INSERT into `blogs`
    const insertSql = `
      INSERT INTO blogs (
        author_id,
        title,
        slug,
        excerpt,
        content,
        cover_image_url,
        tags,
        created_at,
        updated_at,
        published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `

    const [result]: any = await pool.execute(insertSql, [
      finalAuthorId,
      cleanTitle,
      finalSlug,
      cleanExcerpt,
      contentJson,
      cleanCoverUrl,
      tagsJson,
    ])

    const newBlogId = result.insertId

    // Fetch newly created blog
    const [createdRows]: any = await pool.execute(
      `
      SELECT 
        b.blog_id,
        b.author_id,
        b.title,
        b.slug,
        b.excerpt,
        b.content,
        b.cover_image_url,
        b.tags,
        b.created_at,
        b.updated_at,
        b.published_at,
        COALESCE(u.username, 'Admin') AS author_name
      FROM blogs b
      LEFT JOIN admin_users u ON b.author_id = u.user_id
      WHERE b.blog_id = ?
      LIMIT 1
      `,
      [newBlogId]
    )

    const createdBlog = createdRows && createdRows.length > 0 ? parseBlogRow(createdRows[0]) : null

    res.status(201).json({
      success: true,
      message: 'Blog published successfully!',
      data: createdBlog,
      timestamp: Date.now(),
    })
  } catch (err: any) {
    console.error('[Blog Controller - createBlog Error]:', err)
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to create blog in database.',
      timestamp: Date.now(),
    })
  }
}

// 4. PUT /api/blogs/:id (Update blog)
export async function updateBlog(req: Request, res: Response): Promise<void> {
  if (!pool) {
    res.status(503).json({
      success: false,
      message: 'Database connection is unavailable.',
      timestamp: Date.now(),
    })
    return
  }

  try {
    const { id } = req.params
    const blogId = Number(id)

    if (!blogId || isNaN(blogId)) {
      res.status(400).json({
        success: false,
        message: 'Valid numeric blog ID is required.',
        timestamp: Date.now(),
      })
      return
    }

    // Check if blog exists
    const [existingRows]: any = await pool.execute(
      'SELECT * FROM blogs WHERE blog_id = ? LIMIT 1',
      [blogId]
    )

    if (!existingRows || existingRows.length === 0) {
      res.status(404).json({
        success: false,
        message: `Blog with ID ${blogId} not found.`,
        timestamp: Date.now(),
      })
      return
    }

    const existing = existingRows[0]
    const body: IUpdateBlogDTO = req.body || {}

    const newTitle = body.title !== undefined ? String(body.title).trim() : existing.title

    let newSlug = existing.slug
    if (body.slug && String(body.slug).trim() && slugify(body.slug) !== existing.slug) {
      newSlug = await getUniqueSlug(slugify(body.slug), blogId)
    }

    const newExcerpt = body.excerpt !== undefined ? (body.excerpt ? String(body.excerpt).trim() : null) : existing.excerpt
    const newCover = body.cover_image_url !== undefined ? (body.cover_image_url ? String(body.cover_image_url).trim() : null) : existing.cover_image_url

    // Process updated content
    let contentObj: any
    if (body.content !== undefined) {
      contentObj = body.content
      if (typeof contentObj === 'string') {
        try {
          contentObj = JSON.parse(contentObj)
        } catch {
          contentObj = { type: 'doc', content: [{ type: 'paragraph', text: contentObj }] }
        }
      }
    } else {
      try {
        contentObj = JSON.parse(existing.content)
      } catch {
        contentObj = existing.content
      }
    }

    if (typeof contentObj === 'object' && contentObj !== null) {
      if (body.topic !== undefined) contentObj.topic = body.topic
      if (body.type !== undefined) contentObj.blogType = body.type
    }

    const contentJson = JSON.stringify(contentObj)

    // Process updated tags
    let tagsList: string[] = []
    if (body.tags !== undefined) {
      if (Array.isArray(body.tags)) {
        tagsList = body.tags.map(String)
      } else if (body.tags) {
        tagsList = [String(body.tags)]
      }
    } else {
      try {
        const decoded = JSON.parse(existing.tags)
        if (Array.isArray(decoded)) tagsList = decoded
      } catch {
        tagsList = []
      }
    }

    if (body.topic && !tagsList.includes(body.topic)) tagsList.push(body.topic)
    if (body.type && !tagsList.includes(body.type)) tagsList.push(body.type)
    const tagsJson = JSON.stringify(tagsList)

    const updateSql = `
      UPDATE blogs SET
        title = ?,
        slug = ?,
        excerpt = ?,
        content = ?,
        cover_image_url = ?,
        tags = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE blog_id = ?
    `

    await pool.execute(updateSql, [
      newTitle,
      newSlug,
      newExcerpt,
      contentJson,
      newCover,
      tagsJson,
      blogId,
    ])

    // Fetch updated blog
    const [updatedRows]: any = await pool.execute(
      `
      SELECT 
        b.blog_id,
        b.author_id,
        b.title,
        b.slug,
        b.excerpt,
        b.content,
        b.cover_image_url,
        b.tags,
        b.created_at,
        b.updated_at,
        b.published_at,
        COALESCE(u.username, 'Admin') AS author_name
      FROM blogs b
      LEFT JOIN admin_users u ON b.author_id = u.user_id
      WHERE b.blog_id = ?
      LIMIT 1
      `,
      [blogId]
    )

    const updatedBlog = updatedRows && updatedRows.length > 0 ? parseBlogRow(updatedRows[0]) : null

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully.',
      data: updatedBlog,
      timestamp: Date.now(),
    })
  } catch (err: any) {
    console.error('[Blog Controller - updateBlog Error]:', err)
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to update blog.',
      timestamp: Date.now(),
    })
  }
}

// 5. DELETE /api/blogs/:id (Delete blog and cleanup associated uploaded images)
export async function deleteBlog(req: Request, res: Response): Promise<void> {
  if (!pool) {
    res.status(503).json({
      success: false,
      message: 'Database connection is unavailable.',
      timestamp: Date.now(),
    })
    return
  }

  try {
    const { id } = req.params
    const blogId = Number(id)

    if (!blogId || isNaN(blogId)) {
      res.status(400).json({
        success: false,
        message: 'Valid numeric blog ID is required for deletion.',
        timestamp: Date.now(),
      })
      return
    }

    // Check if exists and retrieve cover_image_url and content for image cleanup
    const [existingRows]: any = await pool.execute(
      'SELECT blog_id, title, cover_image_url, content FROM blogs WHERE blog_id = ? LIMIT 1',
      [blogId]
    )

    if (!existingRows || existingRows.length === 0) {
      res.status(404).json({
        success: false,
        message: `Blog with ID ${blogId} not found.`,
        timestamp: Date.now(),
      })
      return
    }

    const blog = existingRows[0]
    const blogTitle = blog.title

    // Extract all associated image filenames from cover_image_url and content
    const imageFilenames = extractBlogImageFilenames(blog.cover_image_url, blog.content)

    // Delete associated physical image files from disk
    let deletedImagesCount = 0
    for (const filename of imageFilenames) {
      const deleted = await deleteUploadedFile(filename)
      if (deleted) deletedImagesCount++
    }

    // Delete the blog row from the database
    await pool.execute('DELETE FROM blogs WHERE blog_id = ?', [blogId])

    res.status(200).json({
      success: true,
      message: `Blog "${blogTitle}" and its associated images deleted successfully.`,
      deleted_id: blogId,
      deleted_images_count: deletedImagesCount,
      timestamp: Date.now(),
    })
  } catch (err: any) {
    console.error('[Blog Controller - deleteBlog Error]:', err)
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to delete blog from database.',
      timestamp: Date.now(),
    })
  }
}
