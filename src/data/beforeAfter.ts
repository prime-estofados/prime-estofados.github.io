export interface BeforeAfterPair {
  before: string
  after: string
  /** Filtro CSS aplicado só na imagem "antes" (use apenas se a foto "antes" ainda for placeholder). */
  beforeFilter?: string
  label: string
  caption: string
}

// Fotos reais enviadas pelo cliente, normalizadas pelo script scripts/process-before-after.mjs
// (mesmo enquadramento/proporção, otimizadas em WebP) → public/imagens/antes-depois/.
export const beforeAfter: BeforeAfterPair[] = [
  {
    before: '/imagens/antes-depois/sofa-cinza-antes.webp',
    after: '/imagens/antes-depois/sofa-cinza-depois.webp',
    label: 'Sofá claro',
    caption: 'Sofá com manchas no assento — higienizado e impermeabilizado',
  },
  {
    before: '/imagens/antes-depois/sofa-retratil-antes.webp',
    after: '/imagens/antes-depois/sofa-retratil-depois.webp',
    label: 'Sofá retrátil',
    caption: 'Sofá retrátil encardido — limpeza profunda devolvendo a cor original',
  },
  {
    before: '/imagens/antes-depois/colchao-antes.webp',
    after: '/imagens/antes-depois/colchao-depois.webp',
    label: 'Colchão',
    caption: 'Colchão amarelado — higienizado e livre de ácaros',
  },
]
