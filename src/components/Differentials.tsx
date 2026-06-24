import { motion } from 'framer-motion'
import type { ComponentType } from 'react'
import Reveal from './shared/Reveal'
import {
  BoltIcon,
  CpuIcon,
  DropletIcon,
  HomeIcon,
  LeafIcon,
  ShieldHeartIcon,
} from './shared/icons'

interface IconProps {
  className?: string
  size?: number
}

// Bento grid (base UI/UX Pro Max → "Bento Box Grid"): card destaque 2x2,
// quatro tiles 2x1 à direita e um card largo na base. Tilagem sem buracos
// num grid de 6 colunas no desktop.
const tiles: { icon: ComponentType<IconProps>; title: string; text: string }[] = [
  {
    icon: CpuIcon,
    title: 'Tecnologia de Ponta',
    text: 'Equipamentos profissionais de última geração para resultados superiores em cada higienização.',
  },
  {
    icon: DropletIcon,
    title: 'Produtos de Alta Qualidade',
    text: 'Insumos premium, certificados e seguros — o melhor para o seu estofado e para a sua família.',
  },
  {
    icon: HomeIcon,
    title: 'Atendimento Residencial',
    text: 'Vamos até você, com pontualidade e cuidado, em Concórdia e região.',
  },
  {
    icon: BoltIcon,
    title: 'Secagem Rápida',
    text: 'Em poucas horas seu móvel está pronto para uso — limpo, fresco e protegido.',
  },
]

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
} as const

export default function Differentials() {
  return (
    <section id="diferenciais" className="bg-canvas py-20">
      <div className="container-prime">
        <Reveal className="mb-12 text-center">
          <span className="section-label">Diferenciais</span>
          <h2 className="mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)] text-navy">Por que escolher a Prime?</h2>
          <div className="divider mx-auto" />
          <p className="mx-auto mt-4 max-w-lg text-[0.95rem] text-[#3d6070]">
            Compromisso com qualidade, saúde e satisfação do cliente em cada serviço realizado.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-fr">
          {/* Card destaque: Saúde em primeiro lugar (99% de ácaros) */}
          <motion.div
            {...cardMotion}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#1e4a5c_0%,#0d2d28_100%)] p-7 text-white shadow-[0_10px_40px_rgba(13,45,40,0.35)] sm:col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal/30 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
            <div className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-teal/20 blur-3xl" />

            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-teal-light ring-1 ring-white/15 backdrop-blur-sm">
                <ShieldHeartIcon size={26} />
              </span>
              <h3 className="mt-5 font-serif text-2xl leading-tight text-white">
                Saúde em Primeiro Lugar
              </h3>
              <p className="mt-2 max-w-xs text-[0.9rem] leading-relaxed text-white/75">
                Eliminamos ácaros, fungos e bactérias que causam alergias e problemas respiratórios —
                um ambiente mais limpo e saudável para toda a família.
              </p>
            </div>

            <div className="relative mt-6 flex items-end gap-3">
              <span className="font-serif text-5xl font-bold leading-none text-teal-light">99%</span>
              <span className="pb-1 text-[0.8rem] leading-snug text-white/70">
                de ácaros e<br />microrganismos eliminados
              </span>
            </div>
          </motion.div>

          {/* Quatro tiles 2x1 */}
          {tiles.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                {...cardMotion}
                transition={{ duration: 0.5, delay: 0.06 + (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-teal/15 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-card-hover sm:col-span-1 lg:col-span-2 lg:row-span-1"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(to_right,#3aaa9e,#1e4a5c)] transition-transform duration-300 group-hover:scale-x-100" />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-light text-teal-dark transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mb-1.5 mt-4 font-sans text-base font-semibold text-navy">{item.title}</h3>
                <p className="text-[0.875rem] leading-relaxed text-[#3d6070]">{item.text}</p>
              </motion.div>
            )
          })}

          {/* Card largo na base: produtos biodegradáveis */}
          <motion.div
            {...cardMotion}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col items-start gap-5 overflow-hidden rounded-2xl border border-teal/15 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-card-hover sm:col-span-2 sm:flex-row sm:items-center lg:col-span-6"
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_right,rgba(58,170,158,0.10),transparent_70%)]" />
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal-light text-teal-dark transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
              <LeafIcon size={24} />
            </span>
            <div className="relative">
              <h3 className="mb-1 font-sans text-base font-semibold text-navy">Produtos Biodegradáveis</h3>
              <p className="text-[0.875rem] leading-relaxed text-[#3d6070]">
                Seguros para crianças e pets, e que respeitam o meio ambiente — limpeza responsável do
                início ao fim.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
