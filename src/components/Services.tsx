import { motion } from 'framer-motion'
import { services } from '../data/services'
import Reveal from './shared/Reveal'

export default function Services() {
  return (
    <section id="servicos" className="bg-canvas py-20">
      <div className="container-prime">
        <Reveal className="mb-12 text-center">
          <span className="section-label">O que fazemos</span>
          <h2 className="mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)] text-navy">Nossos Serviços</h2>
          <div className="divider mx-auto" />
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] text-muted">
            Soluções completas de higienização e impermeabilização para todos os tipos de estofados —
            no conforto da sua casa.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.a
              key={service.title}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-teal/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/30 hover:shadow-card-hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Imagem com overlay e zoom no hover */}
              <div className="relative h-[185px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,45,40,0.55)_0%,rgba(13,45,40,0.05)_45%,transparent_70%)]" />
                {/* Badge de ícone flutuante sobre a base da imagem */}
                <div className="absolute -bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl border border-teal/10 bg-white text-xl shadow-[0_6px_18px_rgba(13,45,40,0.18)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                  {service.icon}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2.5 px-5 pb-5 pt-8">
                <h3 className="font-sans text-[0.975rem] font-semibold leading-tight text-teal-dark">
                  {service.title}
                </h3>
                <p className="text-[0.825rem] leading-relaxed text-muted">{service.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[0.8rem] font-semibold text-teal transition-all duration-200 group-hover:gap-2.5 group-hover:text-teal-mid">
                  Solicitar orçamento
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
