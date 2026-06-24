import { waLink } from '../lib/whatsapp'

export interface Service {
  icon: string
  title: string
  description: string
  image: string
  href: string
}

export const services: Service[] = [
  {
    icon: '🛋️',
    title: 'Higienização de Sofás',
    description:
      'Sofás impecáveis. Limpeza profunda que remove ácaros, bactérias, manchas e odores — devolvendo o conforto e a aparência de novo.',
    image: '/imagens/estofados-em-geral.webp',
    href: waLink('Olá! Gostaria de um orçamento para higienização de sofá.'),
  },
  {
    icon: '💺',
    title: 'Higienização de Poltronas',
    description:
      'Poltronas e cadeiras de descanso renovadas. Removemos ácaros, poeira e manchas para prolongar a vida útil do estofado.',
    image: '/imagens/poltronas.webp',
    href: waLink('Olá! Gostaria de um orçamento para higienização de poltronas.'),
  },
  {
    icon: '🪑',
    title: 'Higienização de Cadeiras',
    description:
      'Cadeiras de jantar, escritório e sala limpas e higienizadas. Removemos manchas e restauramos o brilho original.',
    image: '/imagens/cadeiras.webp',
    href: waLink('Olá! Gostaria de um orçamento para higienização de cadeiras.'),
  },
  {
    icon: '🛏️',
    title: 'Colchões e Camas',
    description:
      'Colchões completamente higienizados. Eliminamos ácaros e microrganismos para noites de sono mais saudáveis para toda a família.',
    image: '/imagens/colchoes.webp',
    href: waLink('Olá! Gostaria de um orçamento para higienização de colchão.'),
  },
  {
    icon: '🚗',
    title: 'Bancos de Carro (Automotiva)',
    description:
      'Bancos e carpetes do seu veículo impecáveis. Limpeza profunda que remove ácaros, manchas e odores do interior automotivo.',
    image: '/imagens/automotiva.webp',
    href: waLink('Olá! Gostaria de um orçamento para higienização automotiva (bancos de carro).'),
  },
  {
    icon: '🧶',
    title: 'Puffs e Almofadas',
    description:
      'Puffs, ottomans e almofadas como novos. Limpeza profunda que restaura a aparência original e elimina microrganismos.',
    image: '/imagens/puffs.webp',
    href: waLink('Olá! Gostaria de um orçamento para limpeza de puffs e almofadas.'),
  },
  {
    icon: '🪸',
    title: 'Tapetes e Carpetes',
    description:
      'Tapetes e carpetes como novos. Eliminamos sujeira profunda, ácaros e alérgenos com equipamentos profissionais.',
    image: '/imagens/tapetes-e-carpetes.webp',
    href: waLink('Olá! Gostaria de um orçamento para limpeza de tapetes e carpetes.'),
  },
  {
    icon: '✨',
    title: 'Estofados em Geral',
    description:
      'Qualquer estofado: bancos, assentos, cabeceiras e móveis planejados. Solução completa de higienização e impermeabilização.',
    image: '/imagens/imagem-inicial.webp',
    href: waLink('Olá! Gostaria de um orçamento para higienização de estofados.'),
  },
]
