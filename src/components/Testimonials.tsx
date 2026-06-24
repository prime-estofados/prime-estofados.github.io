import { motion } from 'framer-motion'
import { testimonials } from '../data/testimonials'
import { company } from '../data/company'
import { StarIcon } from './shared/icons'
import Counter from './shared/Counter'
import Reveal from './shared/Reveal'

const gradients = [
  'linear-gradient(135deg,#40b0a4,#2d8a7f)',
  'linear-gradient(135deg,#03445d,#2d8a7f)',
  'linear-gradient(135deg,#2d8a7f,#40b0a4)',
]

export default function Testimonials() {
  return (
    <section id="depoimentos" className="bg-white py-20">
      <div className="container-prime">
        <Reveal className="mb-12 text-center">
          <span className="section-label">Clientes</span>
          <h2 className="mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)] text-navy">O que nossos clientes dizem</h2>
          <div className="divider mx-auto" />
        </Reveal>

        {/* Métricas com contador animado */}
        <Reveal className="mx-auto mb-14 grid max-w-3xl grid-cols-3 gap-4 rounded-2xl border border-teal/15 bg-canvas p-6">
          {company.stats.map((s) => (
            <div key={s.label} className="text-center">
              <Counter
                to={s.value}
                suffix={s.suffix}
                className="font-serif text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold text-teal"
              />
              <div className="mt-1 text-xs text-muted">{s.label}</div>
            </div>
          ))}
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              className="relative rounded-[0.875rem] border border-teal/10 bg-white p-7 shadow-card before:absolute before:right-6 before:top-4 before:font-serif before:text-6xl before:leading-none before:text-teal/15 before:content-['\201C']"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex gap-0.5 text-[#f59e0b]">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <StarIcon key={s} size={16} />
                ))}
              </div>
              <blockquote className="my-4 text-[0.9rem] italic leading-relaxed text-ink">
                “{t.text}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold text-white"
                    style={{ background: gradients[i % gradients.length] }}
                  >
                    {t.name.charAt(0)}
                  </span>
                )}
                <div>
                  <div className="text-[0.875rem] font-semibold text-navy">{t.name}</div>
                  <div className="text-xs text-muted">{t.city}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
