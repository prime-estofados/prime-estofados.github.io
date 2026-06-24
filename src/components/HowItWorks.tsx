import { motion } from 'framer-motion'
import type { ComponentType } from 'react'
import { WA } from '../lib/whatsapp'
import { CalendarIcon, CameraIcon, CheckBadgeIcon, WhatsAppIcon } from './shared/icons'
import Reveal from './shared/Reveal'

interface IconProps {
  className?: string
  size?: number
}

const steps: { icon: ComponentType<IconProps>; title: string; text: string }[] = [
  {
    icon: CameraIcon,
    title: 'Envie uma foto pelo WhatsApp',
    text: 'Fotografe seu estofado e envie pelo WhatsApp. Receba um orçamento sem compromisso em minutos, de forma rápida e transparente.',
  },
  {
    icon: CalendarIcon,
    title: 'Agendamento flexível',
    text: 'Escolha o melhor dia e horário para você. Atendemos com flexibilidade e pontualidade em Concórdia e região, no conforto da sua casa.',
  },
  {
    icon: CheckBadgeIcon,
    title: 'Serviço com qualidade garantida',
    text: 'Nossa equipe realiza o serviço com todo cuidado e produtos de alta qualidade. Resultado impecável ou refazemos sem custo.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-20">
      <div className="container-prime max-w-3xl">
        <Reveal className="mb-14 text-center">
          <span className="section-label">Processo</span>
          <h2 className="mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)] text-navy">Como Funciona?</h2>
          <div className="divider mx-auto" />
          <p className="mx-auto mt-4 max-w-md text-[0.95rem] text-muted">
            Processo simples, rápido e eficiente para transformar seus móveis.
          </p>
        </Reveal>

        <div className="relative">
          {/* Linha-guia vertical que "se desenha" conforme entra na viewport */}
          <motion.span
            aria-hidden
            className="absolute left-[27px] top-3 w-0.5 origin-top rounded-full bg-[linear-gradient(to_bottom,#3aaa9e,rgba(58,170,158,0.12))] md:left-[31px]"
            style={{ bottom: '3rem' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="flex flex-col gap-5">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  className="relative flex items-start gap-5"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Marcador: ícone + número */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal text-white shadow-[0_6px_20px_rgba(58,170,158,0.4)] md:h-16 md:w-16">
                      <Icon size={26} />
                    </div>
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-teal-dark font-sans text-xs font-bold text-white">
                      {i + 1}
                    </span>
                  </div>

                  <div className="flex-1 rounded-2xl border border-teal/10 bg-canvas p-6 transition-all duration-300 hover:border-teal/25 hover:shadow-card">
                    <h3 className="mb-2 font-sans text-[1.05rem] font-semibold text-navy">{step.title}</h3>
                    <p className="text-[0.9rem] leading-relaxed text-muted">{step.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <Reveal className="mt-12 text-center">
          <a href={WA.orcamento} target="_blank" rel="noopener noreferrer" className="btn-primary text-base">
            <WhatsAppIcon size={18} />
            Solicitar Orçamento Agora
          </a>
        </Reveal>
      </div>
    </section>
  )
}
