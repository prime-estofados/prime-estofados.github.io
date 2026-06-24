import { useEffect, useState } from 'react'

/**
 * true quando devemos usar o hero estático (fallback).
 * Hoje só acontece com "reduzir movimento" ligado — o scroll-vídeo roda também
 * no celular (a pedido). Mantido como acessibilidade para quem prefere menos
 * movimento.
 */
export function useStaticHero(): boolean {
  const [staticHero, setStaticHero] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setStaticHero(reduce.matches)
    update()
    reduce.addEventListener('change', update)
    return () => reduce.removeEventListener('change', update)
  }, [])

  return staticHero
}
