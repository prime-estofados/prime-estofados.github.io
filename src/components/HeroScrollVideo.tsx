import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { FRAME_COUNT, HERO_SEGMENTS, framePath } from '../lib/frames'
import { useStaticHero } from '../hooks/usePrefersReducedMotion'
import { WA } from '../lib/whatsapp'
import { WhatsAppIcon } from './shared/icons'
import { company } from '../data/company'
import HeroStatic from './HeroStatic'

// Legendas (crossfade) — vêm dos próprios segmentos de vídeo, em sincronia.
const STAGES = HERO_SEGMENTS

// Desenha a imagem cobrindo TODO o canvas (tela cheia, pode cortar bordas).
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cw: number, ch: number) {
  const ir = img.width / img.height
  const cr = cw / ch
  let dw: number, dh: number, dx: number, dy: number
  if (ir > cr) {
    dh = ch
    dw = ch * ir
    dx = (cw - dw) / 2
    dy = 0
  } else {
    dw = cw
    dh = cw / ir
    dx = 0
    dy = (ch - dh) / 2
  }
  ctx.drawImage(img, dx, dy, dw, dh)
}

export default function HeroScrollVideo() {
  const staticHero = useStaticHero()
  const [framesFailed, setFramesFailed] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const sizeRef = useRef({ w: 0, h: 0 })
  const drawnFrameRef = useRef(-1)
  const displayRef = useRef(0) // frame exibido (float) — suavizado em direção ao alvo

  // Progresso (0..1) calculado manualmente a partir da geometria da seção.
  const progress = useMotionValue(0)

  // Opacidades das legendas, alinhadas aos cortes dos 3 vídeos (terços).
  const stage0 = useTransform(progress, [0.01, 0.07, 0.27, 0.33], [0, 1, 1, 0])
  const stage1 = useTransform(progress, [0.37, 0.43, 0.6, 0.66], [0, 1, 1, 0])
  const stage2 = useTransform(progress, [0.7, 0.76, 1], [0, 1, 1])
  const stageOpacities = [stage0, stage1, stage2]
  const hintOpacity = useTransform(progress, [0, 0.05], [1, 0])
  const ctaOpacity = useTransform(progress, [0.7, 0.8], [0, 1])

  // Desenha um frame (tela cheia) no canvas.
  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { w, h } = sizeRef.current
    ctx.clearRect(0, 0, w, h)
    drawCover(ctx, img, w, h)
  }

  // Preload de todos os frames.
  useEffect(() => {
    if (staticHero) return
    let failed = 0
    const imgs: HTMLImageElement[] = []
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = framePath(i)
      img.onerror = () => {
        failed++
        if (i === 0 || failed > FRAME_COUNT * 0.5) setFramesFailed(true)
      }
      imgs.push(img)
    }
    imagesRef.current = imgs
  }, [staticHero])

  // Dimensiona o canvas para a viewport (com DPR) e força um redraw.
  useEffect(() => {
    if (staticHero) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      sizeRef.current = { w, h }
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawnFrameRef.current = -1 // força redraw no próximo tick
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [staticHero])

  // Loop de animação: calcula o progresso pela posição da seção e desenha o
  // frame correspondente. Independente da framer-motion para o scrub — só
  // depende de a seção rolar na janela.
  useEffect(() => {
    if (staticHero) return
    let raf = 0

    const tick = () => {
      const el = trackRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const distance = rect.height - window.innerHeight // trecho rolável
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(distance, 1))
        const p = distance > 0 ? scrolled / distance : 0
        progress.set(p)

        // Suaviza o frame exibido em direção ao alvo (easing) → scrub fluido,
        // animando pelos frames intermediários em vez de saltar.
        const targetFloat = p * (FRAME_COUNT - 1)
        const diff = targetFloat - displayRef.current
        displayRef.current += Math.abs(diff) < 0.05 ? diff : diff * 0.16

        const idx = Math.round(displayRef.current)
        const img = imagesRef.current[idx]
        // Redesenha quando o frame muda E já está carregado (ou quando um frame
        // que faltava acabou de carregar).
        if (img && img.complete && img.naturalWidth > 0 && drawnFrameRef.current !== idx) {
          drawFrame(img)
          drawnFrameRef.current = idx
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticHero])

  if (staticHero || framesFailed) {
    return <HeroStatic />
  }

  return (
    <section id="hero" ref={trackRef} className="relative h-[360vh]">
      {/* Palco fixo */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-teal-deep">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Camada de legibilidade */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,30,28,0.78)_0%,rgba(8,30,28,0.25)_45%,rgba(8,30,28,0.45)_100%)]" />

        {/* Badge de localização */}
        <div className="absolute left-0 right-0 top-20 flex justify-center px-6 md:top-24">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
            {company.city}
          </span>
        </div>

        {/* Legendas por estágio (crossfade) */}
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center px-6 text-center">
          <div className="relative h-[260px] w-full max-w-3xl md:h-[230px]">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.title}
                style={{ opacity: stageOpacities[i] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-light/30 bg-teal-light/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-teal-light backdrop-blur-sm">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal text-[0.6rem] text-white">
                    {i + 1}
                  </span>
                  Etapa {i + 1} de {STAGES.length}
                </span>
                <h1 className="mb-4 text-[clamp(2rem,6vw,4rem)] font-extrabold leading-[1.05] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                  {stage.title}
                </h1>
                <span className="mb-4 block h-[3px] w-12 rounded-full bg-[linear-gradient(to_right,#3aaa9e,#e4f6f4)]" />
                <p className="max-w-xl text-base text-white/85 md:text-lg">{stage.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTAs aparecem no final do scroll */}
        <motion.div
          style={{ opacity: ctaOpacity }}
          className="absolute inset-x-0 bottom-16 flex flex-wrap items-center justify-center gap-4 px-6"
        >
          <a href={WA.agendar} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base">
            <WhatsAppIcon size={18} />
            Agendar no WhatsApp
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
          >
            Ver Serviços ↓
          </a>
        </motion.div>

        {/* Barra de progresso do scroll do hero */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <motion.div
            style={{ scaleX: progress }}
            className="h-full origin-left bg-[linear-gradient(to_right,#3aaa9e,#e4f6f4)]"
          />
        </div>

        {/* Dica de scroll no começo */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Role para descobrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1"
          >
            <span className="h-2 w-1 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
