import type { ReactNode } from 'react'

interface IconProps {
  className?: string
  size?: number
}

export function WhatsAppIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.77 1.82 6.77L2 30l7.44-1.79A13.93 13.93 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm6.29 19.93c-.34-.17-2.01-.99-2.32-1.1-.31-.11-.54-.17-.77.17-.22.34-.88 1.1-1.08 1.33-.2.22-.4.25-.74.08-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.69-2.01-1.89-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.22-.34.34-.57.11-.22.06-.43-.03-.6-.08-.17-.77-1.85-1.05-2.53-.28-.68-.56-.59-.77-.6l-.65-.01c-.22 0-.58.08-.88.4-.3.31-1.16 1.13-1.16 2.76s1.19 3.2 1.35 3.42c.17.22 2.34 3.57 5.67 5.01.79.34 1.41.54 1.89.69.79.25 1.51.22 2.08.13.63-.1 1.95-.8 2.22-1.57.28-.77.28-1.43.2-1.57-.08-.14-.3-.22-.64-.39z" />
    </svg>
  )
}

export function InstagramIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function StarIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/* ── Ícones de linha (stroke) usados nos Diferenciais ──────────────────── */

function LineIcon({ className, size = 24, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

// Tecnologia / equipamentos de ponta
export function CpuIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="5" y="5" width="14" height="14" rx="2.5" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </LineIcon>
  )
}

// Produtos de alta qualidade (gota/insumo premium)
export function DropletIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 3.5c3 3.4 5.5 6.3 5.5 9.5a5.5 5.5 0 0 1-11 0c0-3.2 2.5-6.1 5.5-9.5Z" />
      <path d="M9.2 13.4a2.8 2.8 0 0 0 2.8 2.8" />
    </LineIcon>
  )
}

// Saúde em primeiro lugar (escudo + coração)
export function ShieldHeartIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 3 5 6v5.5c0 4.3 3 7.4 7 9 4-1.6 7-4.7 7-9V6l-7-3Z" />
      <path d="M12 14.2c-1.4-1-2.6-1.8-2.6-3a1.5 1.5 0 0 1 2.6-1 1.5 1.5 0 0 1 2.6 1c0 1.2-1.2 2-2.6 3Z" />
    </LineIcon>
  )
}

// Atendimento residencial (casa)
export function HomeIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8.5" />
      <path d="M10 20v-5h4v5" />
    </LineIcon>
  )
}

// Secagem rápida (raio)
export function BoltIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </LineIcon>
  )
}

// Produtos biodegradáveis (folha)
export function LeafIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M5 19c0-7 5-13 14-13 0 9-6 14-13 14-1.5 0-1 0-1 0Z" />
      <path d="M5 19c3.5-4 7-6 11-7.5" />
    </LineIcon>
  )
}

/* ── Ícones das etapas "Como Funciona" ────────────────────────────────── */

// Enviar foto pelo WhatsApp (câmera)
export function CameraIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h1.6l.9-1.5a1 1 0 0 1 .86-.5h4.28a1 1 0 0 1 .86.5L15 7h3.5A1.5 1.5 0 0 1 20 8.5v8A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-8Z" />
      <circle cx="12" cy="12" r="3" />
    </LineIcon>
  )
}

// Agendamento flexível (calendário)
export function CalendarIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
      <path d="M4 9.5h16M8 3.5v4M16 3.5v4" />
      <path d="M8.5 14h2M13.5 14h2M8.5 17h2" />
    </LineIcon>
  )
}

// Serviço com qualidade garantida (selo de verificação)
export function CheckBadgeIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m12 3 2.2 1.6 2.7-.3 1 2.5 2.3 1.4-.6 2.7.6 2.7-2.3 1.4-1 2.5-2.7-.3L12 21l-2.2-1.6-2.7.3-1-2.5L3.8 16l.6-2.7-.6-2.7 2.3-1.4 1-2.5 2.7.3L12 3Z" />
      <path d="m9.2 12 1.9 1.9 3.7-3.8" />
    </LineIcon>
  )
}
