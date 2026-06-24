export interface Testimonial {
  name: string
  city: string
  rating: number
  text: string
  // Quando o cliente enviar prints/fotos reais, basta preencher `avatar`.
  avatar?: string
}

// ⚠️ PLACEHOLDERS — substituir por depoimentos REAIS (Google/WhatsApp) quando o cliente enviar.
// A estrutura já está pronta: é só trocar os textos/nomes/notas aqui.
export const testimonials: Testimonial[] = [
  {
    name: 'Ana Costa',
    city: 'Concórdia - SC',
    rating: 5,
    text: 'Excelente trabalho na impermeabilização! Caiu suco no sofá e não manchou nada. A qualidade do serviço superou todas as minhas expectativas.',
  },
  {
    name: 'Carlos Mendes',
    city: 'Concórdia - SC',
    rating: 5,
    text: 'Meu sofá estava com cheiro ruim e manchas antigas. Depois da higienização ficou como novo! Equipe pontual e muito atenciosa. Recomendo demais!',
  },
  {
    name: 'Maria Oliveira',
    city: 'Concórdia - SC',
    rating: 5,
    text: 'Higienizei o colchão do meu filho que sofria de alergias. Após o serviço, melhorou muito! Processo rápido, sem odor e super profissional.',
  },
]
