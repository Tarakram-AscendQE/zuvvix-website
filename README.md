# Zuvvix Full-Stack Platform

A modern, production-grade monorepo containing the **Zuvvix frontend application**, **backend API service**, and **shared common library**.

---

## 📁 Repository Structure

```text
zuvvix-updated-site/
├── frontend/               # React 18 + Vite + Tailwind CSS v4 Client Application
│   ├── src/                # UI components, pages, hooks, services
│   │   ├── components/     # Reusable UI components & layouts
│   │   ├── pages/          # Application views (Home, ArticlePublish, etc.)
│   │   ├── services/       # Client-side API and auth services
│   │   └── types/          # Frontend-specific types
│   ├── public/             # Static public assets (images, logos, fonts)
│   ├── package.json        # Frontend package configuration
│   └── vite.config.ts      # Vite bundler configuration
│
├── backend/                # Node.js + Express + TypeScript API Server
│   ├── src/
│   │   ├── config/         # Environment variables & DB connection configs
│   │   ├── controllers/    # Request handlers (auth, articles)
│   │   ├── middleware/     # Auth checks, error handling, validation
│   │   ├── models/         # Data models ready for database persistence
│   │   ├── routes/         # REST API route definitions
│   │   └── server.ts       # Express server bootstrap
│   ├── package.json        # Backend package configuration
│   ├── tsconfig.json       # TypeScript compiler configuration
│   └── .env.example        # Sample environment variables
│
├── common/                 # Shared TypeScript models, constants & validators
│   ├── types/              # Cross-boundary interfaces (User, Article, Auth, API)
│   ├── constants/          # Shared endpoints, categories, error codes
│   ├── validators/         # Input sanitizers & validation rules
│   ├── index.ts            # Main export entrypoint
│   └── package.json        # Common package configuration
│
├── package.json            # Monorepo root workspace configuration
└── README.md               # Monorepo documentation
```

---

## 🚀 Quick Start

### 1. Install Dependencies
Run from the root directory:
```bash
npm install
```

### 2. Run Development Servers
- **Frontend Only** (Default Vite dev server on port `5173`):
  ```bash
  npm run dev
  # or
  npm run dev:frontend
  ```

- **Backend Only** (Express API server on port `5000`):
  ```bash
  npm run dev:backend
  ```

- **Start Production Backend**:
  ```bash
  npm run build:backend
  npm run start
  ```

---

## 🛠️ Build Commands

- **Build Frontend**:
  ```bash
  npm run build:frontend
  ```
- **Build Backend**:
  ```bash
  npm run build:backend
  ```
- **Build All**:
  ```bash
  npm run build
  ```

---

## 🔗 Shared Code (`@common`)
Both `frontend/` and `backend/` import shared contracts directly from `common/`:
- **Frontend alias**: `@common/*` mapped to `../common/*` via Vite and TypeScript path mappings.
- **Backend alias**: `@common/*` mapped to `../../common/*` via TypeScript path mappings.

### What is shared?
- `common/types/auth.ts`: Authentication requests, responses, and session structures.
- `common/types/article.ts`: Article creation, editing, status, and tag models.
- `common/types/api.ts`: Standardized JSON API response shapes (`ApiResponse<T>`).
- `common/constants/index.ts`: Standard route endpoints and category lists.
- `common/validators/index.ts`: Form and payload validation logic.

---

## 🔒 Authentication & Blog Writing Flow
- Accessing `/thinking/blog-login` renders the authentication screen.
- Successful login grants access to the **Zuvvix Studio** article editor (Tiptap-powered rich text with lists, image uploads, and emoji picker).
- Once logged in, session tokens are securely held in memory / local storage and authenticated against backend routes.

# zuvvix-website
