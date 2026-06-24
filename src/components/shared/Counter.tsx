import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

interface CounterProps {
  to: number
  suffix?: string
  className?: string
  duration?: number
}

/** Conta de 0 até `to` quando entra na viewport. */
export default function Counter({ to, suffix = '', className, duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
