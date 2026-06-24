import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WA } from '../lib/whatsapp'
import { WhatsAppIcon } from './shared/icons'
import { useActiveSection } from '../hooks/useActiveSection'

const NAV = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'contato', label: 'Contato' },
]
const NAV_IDS = NAV.map((n) => n.id)

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(NAV_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-[100] bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_16px_rgba(3,68,93,0.09)]' : 'shadow-none'
      }`}
    >
      <div className="container-prime flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center" aria-label="Prime Estofados — início">
          <img src="/imagens/logo.png" alt="Prime Estofados" className="h-11 w-auto" />
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300 ${
                active === item.id
                  ? 'text-teal after:w-full'
                  : 'text-ink after:w-0 hover:text-teal hover:after:w-full'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <a
            href={WA.orcamento}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden px-4 py-2 text-xs md:inline-flex"
          >
            <WhatsAppIcon size={14} />
            Orçamento Grátis
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex rounded-md p-1.5 transition-colors hover:bg-teal-light md:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#03445d" strokeWidth="2.2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gray-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${active === item.id ? 'text-teal' : 'text-ink'}`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={WA.orcamento}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary justify-center"
              >
                <WhatsAppIcon size={16} />
                Orçamento Grátis
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
