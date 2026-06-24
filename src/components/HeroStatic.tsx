import { motion } from 'framer-motion'
import { WA } from '../lib/whatsapp'
import { WhatsAppIcon } from './shared/icons'
import { company } from '../data/company'

/** Hero estático — usado em telas pequenas, com prefers-reduced-motion ou se os frames falharem. */
export default function HeroStatic() {
  return (
    <section
      id="hero"
      className="grain relative overflow-hidden bg-[linear-gradient(145deg,#eaf7fb_0%,#d8eff6_45%,#e4f6f0_100%)]"
    >
      <div className="container-prime grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">{company.city}</span>
          <h1 className="mb-5 text-[clamp(2rem,7vw,3.2rem)] font-extrabold leading-[1.12] text-navy">
            Higienização Profunda{' '}
            <span className="font-sans font-extrabold">&amp;</span>
            <br />
            <span className="text-teal">Impermeabilização</span>
            <br />
            de Estofados
          </h1>
          <p className="mb-8 max-w-lg text-[1.05rem] text-[#3d6070]">
            Proteja sua família de ácaros, bactérias e alergias com produtos de alta qualidade e
            tecnologia avançada. Sofás, colchões, poltronas e estofados em geral transformados.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={WA.agendar} target="_blank" rel="noopener noreferrer" className="btn-primary text-base">
              <WhatsAppIcon size={18} />
              Agendar Agora
            </a>
            <a href="#servicos" className="btn-outline text-base">
              Conhecer Serviços ↓
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            {company.stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-[1.75rem] font-extrabold leading-none text-teal">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="mt-1 text-xs text-[#6a8fa0]">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative hidden overflow-hidden rounded-[1.25rem] shadow-[0_20px_60px_rgba(26,58,74,0.18)] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgba(26,58,74,0.12)_0%,transparent_50%)] md:block"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/imagens/imagem-inicial.webp"
            alt="Sofá limpo e renovado após higienização profissional"
            className="h-[480px] w-full object-cover"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  )
}
