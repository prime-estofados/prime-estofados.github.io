import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { beforeAfter } from '../data/beforeAfter'
import Reveal from './shared/Reveal'

export default function BeforeAfter() {
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const pair = beforeAfter[active]

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, pct)))
  }, [])

  return (
    <section id="antes-depois" className="bg-white py-20">
      <div className="container-prime">
        <Reveal className="mb-10 text-center">
          <span className="section-label">Resultado real</span>
          <h2 className="mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)] text-navy">Antes &amp; Depois</h2>
          <div className="divider mx-auto" />
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] text-muted">
            Trabalhos reais da Prime. Arraste para comparar a diferença que a higienização
            profissional faz no seu estofado.
          </p>
        </Reveal>

        {/* Seletor de casos */}
        <Reveal className="mb-8 flex flex-wrap justify-center gap-3">
          {beforeAfter.map((p, i) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setActive(i)
                setPos(50)
              }}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                active === i
                  ? 'border-teal bg-teal text-white shadow-teal'
                  : 'border-teal/30 bg-white text-teal-dark hover:border-teal hover:bg-teal-light'
              }`}
            >
              {p.label}
            </button>
          ))}
        </Reveal>

        <Reveal className="mx-auto max-w-3xl">
          <div
            ref={containerRef}
            className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl bg-teal-deep shadow-[0_20px_60px_rgba(26,58,74,0.18)]"
            onPointerDown={(e) => {
              dragging.current = true
              ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
              updateFromClientX(e.clientX)
            }}
            onPointerMove={(e) => dragging.current && updateFromClientX(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerLeave={() => (dragging.current = false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {/* Depois (base) */}
                <img
                  src={pair.after}
                  alt={`Depois — ${pair.label}`}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute bottom-4 right-4 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  Depois
                </span>

                {/* Antes (recortado via clip-path) */}
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                  <img
                    src={pair.before}
                    alt={`Antes — ${pair.label}`}
                    draggable={false}
                    style={{ filter: pair.beforeFilter }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    Antes
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Divisória + alça */}
            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-teal bg-white shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3aaa9e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l-4 6 4 6" />
                  <path d="M15 6l4 6-4 6" />
                </svg>
              </div>
            </div>

            {/* Range acessível */}
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={`Comparar antes e depois — ${pair.label}`}
              className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
          <p className="mt-3 text-center text-xs text-muted">{pair.caption}</p>
        </Reveal>
      </div>
    </section>
  )
}
