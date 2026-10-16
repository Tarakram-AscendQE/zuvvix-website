import { useState, useEffect, useRef, useCallback } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const BEATS = [0, 1500, 3000, 5000, 7000, 9000, 12000, 14500, 16500, 19000]
const BEAT_NAMES = [
  'Quiet field',
  'Change enters',
  'Dependencies illuminate',
  'Sourced context',
  'Impact narrows',
  'Assure inside authority',
  'Evidence arrives',
  'Uncertainty stays visible',
  'Assurance Case assembles',
  'Readiness: Ready with exceptions',
]

export function stageOf(s: number): number {
  if (s <= 0) return -1
  if (s === 1) return 0
  if (s <= 3) return 1
  if (s === 4) return 2
  if (s === 5) return 3
  if (s <= 8) return 4
  return 5
}

export function useZwSequencer() {
  const prefersReduced = usePrefersReducedMotion()
  const [step, setStep] = useState(9)
  const [running, setRunning] = useState(false)
  const [paused, setPaused] = useState(false)

  const timersRef = useRef<number[]>([])
  const t0Ref = useRef(0)
  const elapsedRef = useRef(0)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t))
    timersRef.current = []
  }, [])

  const schedule = useCallback(
    (from: number) => {
      clearTimers()
      t0Ref.current = performance.now() - from
      BEATS.forEach((ms, i) => {
        if (ms >= from && i > 0) {
          const timer = window.setTimeout(() => {
            setStep(i)
            if (i === 9) {
              setRunning(false)
              setPaused(false)
            }
          }, ms - from)
          timersRef.current.push(timer)
        }
      })
    },
    [clearTimers]
  )

  const play = useCallback(() => {
    if (prefersReduced) {
      setStep(9)
      return
    }
    setRunning(true)
    setPaused(false)
    setStep(0)
    elapsedRef.current = 0
    schedule(0)
  }, [prefersReduced, schedule])

  const togglePause = useCallback(() => {
    if (!running) return
    if (!paused) {
      setPaused(true)
      elapsedRef.current = performance.now() - t0Ref.current
      clearTimers()
    } else {
      setPaused(false)
      schedule(elapsedRef.current)
    }
  }, [running, paused, clearTimers, schedule])

  const replay = useCallback(() => {
    play()
  }, [play])

  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  const statusText =
    step >= 9 && !running
      ? 'Final state: Ready with exceptions'
      : `Stage: ${BEAT_NAMES[step] || ''}`

  return {
    step,
    running,
    paused,
    play,
    togglePause,
    replay,
    statusText,
    currentStage: stageOf(step),
  }
}

