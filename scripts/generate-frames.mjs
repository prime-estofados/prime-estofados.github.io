// Gera a sequência de frames do efeito scroll-vídeo a partir das fotos da própria Prime
// (Ken Burns: zoom contínuo + crossfade entre 3 cenas). 100% seguro em licença.
// Uso: npm run generate:frames
//
// Para usar um VÍDEO real (stock ou gravado) no lugar, use: npm run extract:frames -- caminho/do/video.mp4
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.resolve(__dirname, '../../prime-estofados-source/Imagens')
const OUT = path.resolve(__dirname, '../public/scroll')

const FRAME_COUNT = 90 // precisa bater com src/lib/frames.ts
const W = 1366
const H = 768
const QUALITY = 70

// Cenas na ordem da narrativa (higienização -> impermeabilização -> resultado).
const SCENES = ['Estofados em geral.png', 'Impermeabilização.png', 'imagem inicial.png']
// Pontos de transição (crossfade) ao longo do scroll e meia-janela.
const TRANSITIONS = [0.36, 0.68]
const HALF = 0.06

function stageBlend(p) {
  for (let k = 0; k < TRANSITIONS.length; k++) {
    if (p < TRANSITIONS[k] - HALF) return { a: k, b: k, t: 0 }
    if (p <= TRANSITIONS[k] + HALF) return { a: k, b: k + 1, t: (p - (TRANSITIONS[k] - HALF)) / (2 * HALF) }
  }
  return { a: SCENES.length - 1, b: SCENES.length - 1, t: 0 }
}

// Renderiza uma imagem com zoom (Ken Burns) recortada em WxH centralizada.
async function renderZoom(file, scale) {
  const zw = Math.round(W * scale)
  const zh = Math.round(H * scale)
  const left = Math.round((zw - W) / 2)
  const top = Math.round((zh - H) / 2)
  return sharp(path.join(SRC, file))
    .resize(zw, zh, { fit: 'cover' })
    .extract({ left, top, width: W, height: H })
}

fs.mkdirSync(OUT, { recursive: true })
if (!fs.existsSync(SRC)) {
  console.error(`✗ Pasta de origem não encontrada: ${SRC}`)
  process.exit(1)
}
// Limpa frames antigos
for (const f of fs.readdirSync(OUT)) if (f.startsWith('frame-')) fs.rmSync(path.join(OUT, f))

console.log(`Gerando ${FRAME_COUNT} frames ${W}x${H}...`)
for (let i = 0; i < FRAME_COUNT; i++) {
  const p = FRAME_COUNT === 1 ? 0 : i / (FRAME_COUNT - 1)
  const scale = 1.0 + 0.16 * p // zoom suave contínuo
  const { a, b, t } = stageBlend(p)

  const baseBuf = await (await renderZoom(SCENES[a], scale)).toBuffer()
  let pipeline = sharp(baseBuf)

  if (a !== b && t > 0) {
    const overBuf = await (await renderZoom(SCENES[b], scale)).ensureAlpha(t).png().toBuffer()
    pipeline = pipeline.composite([{ input: overBuf, blend: 'over' }])
  }

  const name = `frame-${String(i + 1).padStart(4, '0')}.webp`
  await pipeline.webp({ quality: QUALITY }).toFile(path.join(OUT, name))
  if ((i + 1) % 15 === 0 || i === FRAME_COUNT - 1) console.log(`  ${i + 1}/${FRAME_COUNT}`)
}

const total = fs
  .readdirSync(OUT)
  .filter((f) => f.startsWith('frame-'))
  .reduce((sum, f) => sum + fs.statSync(path.join(OUT, f)).size, 0)
console.log(`✓ Concluído. ${FRAME_COUNT} frames, ${(total / 1024 / 1024).toFixed(1)} MB em public/scroll/`)
