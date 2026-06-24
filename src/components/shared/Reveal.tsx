import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  /** Direção de entrada da animação. */
  direction?: Direction
  /** Atraso em segundos. */
  delay?: number
  className?: string
}

const offset = 28

function initialFor(direction: Direction) {
  switch (direction) {
    case 'up':
      return { opacity: 0, y: offset }
    case 'down':
      return { opacity: 0, y: -offset }
    case 'left':
      return { opacity: 0, x: offset }
    case 'right':
      return { opacity: 0, x: -offset }
    default:
      return { opacity: 0 }
  }
}

/**
 * Anima o conteúdo quando entra na viewport (uma única vez).
 * Respeita prefers-reduced-motion automaticamente via framer-motion.
 */
export default function Reveal({ children, direction = 'up', delay = 0, className }: RevealProps) {
  const variants: Variants = {
    hidden: initialFor(direction),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}
