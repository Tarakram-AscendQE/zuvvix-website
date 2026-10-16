import { useState, useEffect } from 'react'

export function useScrollHeader(): boolean {
  const [isSolid, setIsSolid] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return isSolid
}

