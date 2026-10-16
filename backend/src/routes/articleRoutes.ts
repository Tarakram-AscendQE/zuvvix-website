// Article Routes

import { Router } from 'express'
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

export const articleRouter = Router()

articleRouter.get('/', getArticles)
articleRouter.get('/:id', getArticleById)
articleRouter.post('/', requireAuth, createArticle)
articleRouter.put('/:id', requireAuth, updateArticle)
articleRouter.delete('/:id', requireAuth, deleteArticle)

