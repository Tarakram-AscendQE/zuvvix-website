// Article Controller

import { Request, Response } from 'express'
import { articlesStore, IArticle } from '../models/Article.js'

export async function getArticles(req: Request, res: Response): Promise<void> {
  const { status, limit = 10, page = 1 } = req.query

  let filtered = articlesStore
  if (status) {
    filtered = filtered.filter((a) => a.status === status)
  }

  res.status(200).json({
    success: true,
    data: {
      items: filtered,
      total: filtered.length,
      page: Number(page),
      limit: Number(limit),
    },
    timestamp: Date.now(),
  })
}

export async function getArticleById(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const article = articlesStore.find((a) => a.id === id || a.slug === id)

  if (!article) {
    res.status(404).json({
      success: false,
      message: 'Article not found.',
      timestamp: Date.now(),
    })
    return
  }

  res.status(200).json({
    success: true,
    data: article,
    timestamp: Date.now(),
  })
}

export async function createArticle(req: Request, res: Response): Promise<void> {
  const { title, content, coverImage, blurb, tags, status = 'draft' } = req.body || {}

  if (!title && !content) {
    res.status(400).json({
      success: false,
      message: 'Title or content must be provided.',
      timestamp: Date.now(),
    })
    return
  }

  const slug = String(title || 'untitled')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

  const newArticle: IArticle = {
    id: `art_${Date.now()}`,
    slug: `${slug}-${Math.random().toString(36).substring(2, 6)}`,
    title: title || 'Untitled Article',
    content: content || '',
    coverImage: coverImage || null,
    blurb: blurb || '',
    tags: Array.isArray(tags) ? tags : [],
    author: {
      username: 'admin',
      displayName: 'Zuvvix Author',
    },
    status: status === 'published' ? 'published' : 'draft',
    publishedAt: status === 'published' ? new Date().toISOString() : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  articlesStore.unshift(newArticle)

  res.status(201).json({
    success: true,
    message: status === 'published' ? 'Article published successfully!' : 'Draft saved successfully!',
    data: newArticle,
    timestamp: Date.now(),
  })
}

export async function updateArticle(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const articleIndex = articlesStore.findIndex((a) => a.id === id)

  if (articleIndex === -1) {
    res.status(404).json({
      success: false,
      message: 'Article not found.',
      timestamp: Date.now(),
    })
    return
  }

  const existing = articlesStore[articleIndex]
  const updated: IArticle = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString(),
  }

  articlesStore[articleIndex] = updated

  res.status(200).json({
    success: true,
    message: 'Article updated successfully.',
    data: updated,
    timestamp: Date.now(),
  })
}

export async function deleteArticle(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const articleIndex = articlesStore.findIndex((a) => a.id === id)

  if (articleIndex === -1) {
    res.status(404).json({
      success: false,
      message: 'Article not found.',
      timestamp: Date.now(),
    })
    return
  }

  articlesStore.splice(articleIndex, 1)

  res.status(200).json({
    success: true,
    message: 'Article deleted successfully.',
    timestamp: Date.now(),
  })
}

