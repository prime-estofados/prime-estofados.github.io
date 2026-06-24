import { WHATSAPP_NUMBER } from '../lib/whatsapp'
import { company } from '../data/company'
import { InstagramIcon, WhatsAppIcon } from './shared/icons'

const serviceLinks = [
  'Higienização de Sofás',
  'Colchões e Camas',
  'Higienização de Cadeiras',
  'Bancos de Carro',
  'Tapetes e Carpetes',
  'Impermeabilização',
]

export default function Footer() {
  return (
    <footer className="bg-teal-deep px-6 pb-6 pt-12 text-white/75">
      <div className="mx-auto max-w-content">
        <div className="mb-12 grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <a href="#hero" className="mb-4 inline-flex items-center">
              <img
                src="/imagens/logo.png"
                alt="Prime Estofados"
                className="h-12 w-auto brightness-0 invert"
              />
            </a>
            <p className="mb-5 max-w-xs text-sm leading-relaxed">
              Higienização e impermeabilização profissional de estofados em {company.city}.
              Produtos de alta qualidade para proteger sua família.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-teal transition-colors hover:border-teal/40 hover:bg-teal/20"
              >
                <WhatsAppIcon size={16} />
              </a>
              <a
                href={company.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-teal transition-colors hover:border-teal/40 hover:bg-teal/20"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="mb-5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white">
              Serviços
            </h4>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#servicos" className="text-sm text-white/65 transition-colors hover:text-teal">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="mb-5 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white">
              Contato
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <div className="mb-0.5 text-xs uppercase tracking-[0.06em] text-white/45">WhatsApp</div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 transition-colors hover:text-teal"
                >
                  {company.phoneDisplay}
                </a>
              </div>
              <div>
                <div className="mb-0.5 text-xs uppercase tracking-[0.06em] text-white/45">Localização</div>
                <span>{company.city}</span>
              </div>
              <div>
                <div className="mb-0.5 text-xs uppercase tracking-[0.06em] text-white/45">Atendimento</div>
                <span>{company.region}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6">
          <span className="text-xs">
            © {new Date().getFullYear()} {company.name}. Todos os direitos reservados.
          </span>
          <span className="text-xs text-white/40">Higienização Profissional · {company.city}</span>
        </div>
      </div>
    </footer>
  )
}
