# Prime Estofados — Site (React + Vite)

Site institucional da **Prime Estofados** (Concórdia-SC) — higienização e impermeabilização de
estofados. Revitalizado em React + Vite + Tailwind + framer-motion, com efeito **scroll-vídeo** no hero.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build de produção

```bash
npm run build
npm run preview
```

## Assets gerados (já versionados em public/)

| Comando | O que faz |
|---|---|
| `npm run optimize:images` | Converte as fotos originais (PNG) em WebP para `public/imagens/` |
| `npm run generate:frames` | Gera os frames do hero a partir das fotos da Prime (Ken Burns + crossfade) |
| `npm run extract:frames -- video.mp4` | **Alternativa**: extrai os frames de um VÍDEO real (stock/gravado) |

> O hero usa hoje uma sequência cinematográfica gerada a partir das próprias fotos (licença 100%
> segura). Para usar um vídeo real, rode `npm run extract:frames -- caminho/do/video.mp4` — o número
> de frames está em `src/lib/frames.ts` (`FRAME_COUNT`) e deve bater com o gerado.

### Especificação do vídeo (se for usar stock/gravado)
- 16:9, idealmente 1920×1080, plano contínuo (sem cortes), 6–10 s, câmera estável.
- Conteúdo: estofado sendo higienizado (extratora/espuma) ou água repelida em tecido impermeabilizado.

## Conteúdo configurável
- `src/data/company.ts` — telefone, cidade, Instagram, métricas, selos.
- `src/data/services.ts` — serviços e mensagens de WhatsApp.
- `src/data/testimonials.ts` — depoimentos (⚠️ placeholders, trocar pelos reais).
- `src/data/beforeAfter.ts` — par antes/depois (⚠️ placeholder com filtro, trocar pelas fotos reais).
- `src/lib/whatsapp.ts` — número do WhatsApp central.

## Deploy (GitHub Pages)
O repositório é `prime-estofados.github.io` (site de usuário, servido da raiz → `base: '/'`).
O workflow `.github/workflows/deploy.yml` faz build e publica via GitHub Actions.

1. Copie estes arquivos para o repositório `prime-estofados.github.io` (substituindo o `index.html` antigo).
2. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
3. `git push` na branch `main` → o site é publicado automaticamente.
