import { company } from '../data/company'
import { InstagramIcon } from './shared/icons'
import Reveal from './shared/Reveal'

// Sem grade de fotos: o Instagram não permite puxar os posts reais sem API/login,
// e usar imagens de banco como se fossem posts seria enganoso. Em vez disso,
// um convite elegante para seguir o perfil real.
export default function InstagramSection() {
  return (
    <section id="instagram" className="bg-canvas py-20">
      <div className="container-prime">
        <Reveal>
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-teal/10 bg-white px-8 py-12 text-center shadow-card sm:px-12">
            {/* Brilhos decorativos */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(214,41,118,0.12),transparent_70%)]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(58,170,158,0.14),transparent_70%)]" />

            {/* Badge com o gradiente do Instagram */}
            <span className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] text-white shadow-[0_8px_24px_rgba(214,41,118,0.35)]">
              <InstagramIcon size={30} />
            </span>

            <span className="section-label">Acompanhe</span>
            <h2 className="mb-3 text-[clamp(1.8rem,3.5vw,2.6rem)] text-navy">Siga a Prime no Instagram</h2>
            <div className="divider mx-auto" />
            <p className="mx-auto mt-4 max-w-md text-[0.95rem] text-muted">
              Resultados reais, antes e depois, dicas de cuidado e os bastidores dos nossos serviços —
              tudo no nosso perfil.
            </p>

            <a
              href={company.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(45deg,#fa7e1e,#d62976,#962fbf)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_22px_rgba(214,41,118,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(214,41,118,0.45)] active:translate-y-0"
            >
              <InstagramIcon size={18} />
              Seguir {company.instagram.handle}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
