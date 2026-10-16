import { useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useScrollReveal() {
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return

    const vh = window.innerHeight

    // 1. One-shot reveal for data-anim sections/diagrams
    const anims = document.querySelectorAll<HTMLElement>('[data-anim]')
    let animObserver: IntersectionObserver | null = null
    if (anims.length && 'IntersectionObserver' in window) {
      const animObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('play')
              entry.target.classList.remove('armed')
              animObs.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.25 }
      )
      animObserver = animObs
      anims.forEach((el) => {
        if (el.getBoundingClientRect().top > vh * 0.88) {
          el.classList.add('armed')
        } else {
          el.classList.add('play')
        }
        animObs.observe(el)
      })
    }

    // 2. Repeatable drop-line transition for all callout cards
    const cards = document.querySelectorAll<HTMLElement>('.co, .callout, .th-co')
    let cardObserver: IntersectionObserver | null = null
    if (cards.length && 'IntersectionObserver' in window) {
      const cardObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.05) {
              if (!entry.target.classList.contains('play')) {
                entry.target.classList.remove('armed')
                entry.target.classList.add('play')
              }
            } else if (!entry.isIntersecting || entry.intersectionRatio === 0) {
              if (entry.target.classList.contains('play')) {
                entry.target.classList.remove('play')
                entry.target.classList.add('armed')
                void (entry.target as HTMLElement).offsetHeight
              }
            }
          })
        },
        { threshold: [0, 0.05, 0.1] }
      )
      cardObserver = cardObs
      cards.forEach((el) => {
        if (el.getBoundingClientRect().top > vh * 0.88) {
          el.classList.add('armed')
        } else {
          el.classList.add('play')
        }
        cardObs.observe(el)
      })
    }

    return () => {
      animObserver?.disconnect()
      cardObserver?.disconnect()
    }
  }, [prefersReduced])
}

