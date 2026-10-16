// Common System Constants

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  ARTICLES: {
    LIST: '/api/articles',
    GET: (idOrSlug: string) => `/api/articles/${idOrSlug}`,
    CREATE: '/api/articles',
    UPDATE: (id: string) => `/api/articles/${id}`,
    DELETE: (id: string) => `/api/articles/${id}`,
    PUBLISH: '/api/articles/publish',
  },
  UPLOAD: {
    IMAGE: '/api/upload/image',
  },
} as const

export const ARTICLE_CATEGORIES = [
  'All',
  'Continuous Release Assurance',
  'Assurance Case',
  'Quality Mandate',
  'Readiness',
  'Trust & Compliance',
  'Design Partnership',
] as const

export const DEFAULT_PAGE_SIZE = 10

