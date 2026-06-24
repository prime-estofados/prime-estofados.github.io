// Configuração do efeito scroll-vídeo do hero.
// O hero toca 3 vídeos reais da Prime em sequência conforme o scroll:
// extratora (higienização) → impermeabilização → antes/depois.
//
// IMPORTANTE: `frames` de cada segmento precisa bater com FRAMES_PER_SEGMENT
// em scripts/extract-hero-videos.mjs.

export interface HeroSegment {
  /** Nome da subpasta em public/scroll/<key>/ */
  key: string
  /** Quantidade de frames extraídos do vídeo */
  frames: number
  /** Legenda exibida (crossfade) enquanto este segmento é exibido */
  title: string
  text: string
}

export const HERO_SEGMENTS: HeroSegment[] = [
  {
    key: 'limpeza',
    frames: 60,
    title: 'Higienização Profunda',
    text: 'Extração profissional que remove ácaros, bactérias, manchas e a sujeira impregnada no estofado.',
  },
  {
    key: 'impermeabilizacao',
    frames: 60,
    title: 'Impermeabilização',
    text: 'Camada protetora que repele líquidos — o que cai escorre e não penetra no tecido.',
  },
  {
    key: 'resultado',
    frames: 60,
    title: 'Resultado Impecável',
    text: 'Seu estofado renovado, protegido e com secagem rápida. Atendimento residencial em Concórdia e região.',
  },
]

export const FRAME_COUNT = HERO_SEGMENTS.reduce((sum, s) => sum + s.frames, 0)

// Mapeia um índice global (0..FRAME_COUNT-1) para o caminho do frame correto
// dentro da subpasta do segmento.
export function framePath(index: number): string {
  let i = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)))
  for (const seg of HERO_SEGMENTS) {
    if (i < seg.frames) {
      const n = String(i + 1).padStart(4, '0')
      return `${import.meta.env.BASE_URL}scroll/${seg.key}/frame-${n}.webp`
    }
    i -= seg.frames
  }
  // fallback: último frame do último segmento
  const last = HERO_SEGMENTS[HERO_SEGMENTS.length - 1]
  const n = String(last.frames).padStart(4, '0')
  return `${import.meta.env.BASE_URL}scroll/${last.key}/frame-${n}.webp`
}
