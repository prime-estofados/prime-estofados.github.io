import { WA } from '../lib/whatsapp'
import { company } from '../data/company'
import { WhatsAppIcon } from './shared/icons'
import Reveal from './shared/Reveal'

export default function ContactCTA() {
  return (
    <section
      id="contato"
      className="grain relative overflow-hidden py-24 text-center"
      style={{
        background:
          'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(64,176,164,0.25) 0%, transparent 65%), linear-gradient(135deg, #40b0a4 0%, #2d8a7f 50%, #03445d 100%)',
      }}
    >
      <div className="container-prime relative z-10 max-w-2xl">
        <Reveal>
          <span className="section-label-light">Fale Conosco</span>
          <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] text-white">
            Pronto para renovar seus estofados?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[1.05rem] text-white/85">
            Entre em contato agora pelo WhatsApp e receba um orçamento gratuito em minutos.
            Atendimento residencial em {company.region}.
          </p>
          <a href={WA.orcamento} target="_blank" rel="noopener noreferrer" className="btn-dark text-lg">
            <WhatsAppIcon size={22} />
            Fale Conosco no WhatsApp
          </a>
          <p className="mt-6 text-[0.82rem] text-white/60">
            📍 {company.city} &nbsp;·&nbsp; ☎ {company.phoneDisplay} &nbsp;·&nbsp; Atendimento em toda a região
          </p>
        </Reveal>
      </div>
    </section>
  )
}
