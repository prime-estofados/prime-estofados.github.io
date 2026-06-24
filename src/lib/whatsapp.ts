// Helper central para links do WhatsApp com mensagem pré-preenchida.
// Trocar o número aqui reflete em todo o site.
export const WHATSAPP_NUMBER = '5549999514779' // (49) 99951-4779

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Mensagens padrão reutilizadas em CTAs.
export const WA = {
  orcamento: waLink('Olá Prime Estofados! Gostaria de um orçamento grátis.'),
  agendar: waLink('Olá Prime Estofados! Gostaria de agendar um serviço.'),
  impermeabilizacao: waLink('Olá! Gostaria de saber mais sobre impermeabilização de estofados.'),
}
