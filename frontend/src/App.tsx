import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ModalProvider } from '@/context/ModalContext'
import { router } from '@/router'

export function App() {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </ModalProvider>
  )
}

