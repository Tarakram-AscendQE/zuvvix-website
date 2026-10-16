// Blog Routes
// Routes for CRUD operations on GoDaddy MySQL `blogs` table

import { Router } from 'express'
import {
  getBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

export const blogRouter = Router()

// Public read routes
blogRouter.get('/', getBlogs)
blogRouter.get('/:idOrSlug', getBlogByIdOrSlug)

// Authenticated authoring & management routes
blogRouter.post('/', requireAuth, createBlog)
blogRouter.put('/:id', requireAuth, updateBlog)
blogRouter.delete('/:id', requireAuth, deleteBlog)

