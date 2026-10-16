import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { Category } from '@/pages/Category'
import { HowItWorks } from '@/pages/HowItWorks'
import { ContinuousReleaseAssurance } from '@/pages/ContinuousReleaseAssurance'
import { QualityMandate } from '@/pages/QualityMandate'
import { AssuranceCase } from '@/pages/AssuranceCase'
import { Readiness } from '@/pages/Readiness'
import { Trust } from '@/pages/Trust'
import { DesignPartnership } from '@/pages/DesignPartnership'
import { Thinking } from '@/pages/Thinking'
import { FromChangeToEvidence } from '@/pages/FromChangeToEvidence'
import { Privacy } from '@/pages/Privacy'
import { NotFound } from '@/pages/NotFound'
import { BlogAuthGate } from '@/pages/BlogAuthGate'
import { BlogArticle } from '@/pages/BlogArticle'

export const router = createBrowserRouter([
  { path: 'thinking/blog-login', element: <BlogAuthGate /> },
  { path: 'thinking/blog-login/', element: <BlogAuthGate /> },
  { path: 'thinking/studio', element: <BlogAuthGate /> },
  { path: 'thinking/studio/', element: <BlogAuthGate /> },
  { path: 'thinking/wp-login', element: <Navigate to="/thinking/blog-login/" replace /> },
  { path: 'thinking/wp-login/', element: <Navigate to="/thinking/blog-login/" replace /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'category', element: <Category /> },
      { path: 'category/', element: <Category /> },
      { path: 'how-it-works', element: <HowItWorks /> },
      { path: 'how-it-works/', element: <HowItWorks /> },
      { path: 'continuous-release-assurance', element: <ContinuousReleaseAssurance /> },
      { path: 'continuous-release-assurance/', element: <ContinuousReleaseAssurance /> },
      { path: 'quality-mandate', element: <QualityMandate /> },
      { path: 'quality-mandate/', element: <QualityMandate /> },
      { path: 'assurance-case', element: <AssuranceCase /> },
      { path: 'assurance-case/', element: <AssuranceCase /> },
      { path: 'readiness', element: <Readiness /> },
      { path: 'readiness/', element: <Readiness /> },
      { path: 'trust', element: <Trust /> },
      { path: 'trust/', element: <Trust /> },
      { path: 'design-partnership', element: <DesignPartnership /> },
      { path: 'design-partnership/', element: <DesignPartnership /> },
      { path: 'thinking', element: <Thinking /> },
      { path: 'thinking/', element: <Thinking /> },
      { path: 'thinking/article/:slug', element: <BlogArticle /> },
      { path: 'thinking/article/:slug/', element: <BlogArticle /> },
      { path: 'from-change-to-evidence', element: <FromChangeToEvidence /> },
      { path: 'from-change-to-evidence/', element: <FromChangeToEvidence /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'privacy/', element: <Privacy /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

