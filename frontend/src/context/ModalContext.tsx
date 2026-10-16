import React, { createContext, useContext, useState } from 'react'

interface ModalContextType {
  isFollowOpen: boolean
  openFollow: () => void
  closeFollow: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isFollowOpen, setIsFollowOpen] = useState(false)

  const openFollow = () => setIsFollowOpen(true)
  const closeFollow = () => setIsFollowOpen(false)

  return (
    <ModalContext.Provider value={{ isFollowOpen, openFollow, closeFollow }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

