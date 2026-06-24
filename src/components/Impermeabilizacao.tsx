import { motion } from 'framer-motion'
import { WA } from '../lib/whatsapp'
import { WhatsAppIcon } from './shared/icons'
import Reveal from './shared/Reveal'

const benefits = [
  { icon: '💧', title: 'Repele líquidos', text: 'Café, suco, vinho ou água escorrem sem penetrar no tecido.' },
  { icon: '🛡️', title: 'Proteção duradoura', text: 'Mantém o estofado protegido contra manchas por muito mais tempo.' },
  { icon: '🧽', title: 'Limpeza fácil', text: 'O dia a dia fica simples: um pano basta para a maioria dos acidentes.' },
]

export default function Impermeabilizacao() {
  return (
    <section
      id="impermeabilizacao"
      className="grain relative overflow-hidden bg-[linear-gradient(160deg,#dff2f8_0%,#e8f6fa_50%,#d6f0ec_100%)] py-20"
    >
      <div className="container-prime relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Imagem */}
          <Reveal direction="right" className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(26,58,74,0.18)]">
              <img
                src="/imagens/impermeabilizacao.webp"
                alt="Gota d'água repelida pelo tecido impermeabilizado"
                loading="lazy"
                className="h-[360px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,68,93,0.35)_0%,transparent_55%)]" />
              <motion.span
                className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-dark shadow-sm backdrop-blur-sm"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                Tecnologia exclusiva
              </motion.span>
            </div>
          </Reveal>

          {/* Texto */}
          <Reveal direction="left" className="order-1 lg:order-2">
            <span className="section-label">Proteção</span>
            <h2 className="mb-4 text-[clamp(1.7rem,3.5vw,2.4rem)] text-navy">
              Impermeabilização Profissional
            </h2>
            <div className="divider" />
            <p className="mb-6 mt-4 max-w-lg text-[0.95rem] leading-relaxed text-[#3d6070]">
              Após a higienização, aplicamos uma camada protetora invisível com produtos de alta
              qualidade. Seu sofá fica como novo por muito mais tempo — e limpar nunca foi tão fácil.
            </p>

            <div className="mb-8 flex flex-col gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                    {b.icon}
                  </span>
                  <div>
                    <h3 className="font-sans text-[0.95rem] font-semibold text-navy">{b.title}</h3>
                    <p className="text-[0.85rem] text-[#3d6070]">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href={WA.impermeabilizacao} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon size={16} />
              Quero impermeabilizar
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
