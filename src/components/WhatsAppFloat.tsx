import { motion } from 'framer-motion'
import { WA } from '../lib/whatsapp'
import { WhatsAppIcon } from './shared/icons'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={WA.orcamento}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato via WhatsApp"
      className="fixed bottom-7 right-7 z-[200] flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-20" />
      <WhatsAppIcon size={28} />
    </motion.a>
  )
}
