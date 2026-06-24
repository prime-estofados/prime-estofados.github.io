// Extrai ~90 frames WebP de um VÍDEO real (stock ou gravado) para public/scroll.
// Uso: npm run extract:frames -- caminho/do/video.mp4
// Requer: ffmpeg-static (já incluído nas devDependencies).
import ffmpegPath from 'ffmpeg-static'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '../public/scroll')
const FRAME_COUNT = 90 // precisa bater com src/lib/frames.ts
const WIDTH = 1366

const input = process.argv[2]
if (!input) {
  console.error('Uso: npm run extract:frames -- caminho/do/video.mp4')
  process.exit(1)
}
if (!fs.existsSync(input)) {
  console.error(`✗ Vídeo não encontrado: ${input}`)
  process.exit(1)
}

// Descobre a duração do vídeo lendo o stderr do ffmpeg.
function probeDuration(file) {
  const res = spawnSync(ffmpegPath, ['-i', file], { encoding: 'utf-8' })
  const out = `${res.stderr || ''}`
  const m = out.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/)
  if (!m) return null
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3])
}

fs.mkdirSync(OUT, { recursive: true })
for (const f of fs.readdirSync(OUT)) if (f.startsWith('frame-')) fs.rmSync(path.join(OUT, f))

const duration = probeDuration(input)
if (!duration) {
  console.error('✗ Não foi possível ler a duração do vídeo.')
  process.exit(1)
}
const fps = (FRAME_COUNT / duration).toFixed(4)
console.log(`Vídeo: ${duration.toFixed(1)}s → extraindo ${FRAME_COUNT} frames (fps=${fps})...`)

const args = [
  '-i', input,
  '-vf', `fps=${fps},scale=${WIDTH}:-2:flags=lanczos`,
  '-frames:v', String(FRAME_COUNT),
  '-c:v', 'libwebp',
  '-quality', '72',
  '-y',
  path.join(OUT, 'frame-%04d.webp'),
]
const run = spawnSync(ffmpegPath, args, { stdio: 'inherit' })
if (run.status !== 0) {
  console.error('✗ ffmpeg falhou.')
  process.exit(1)
}
const count = fs.readdirSync(OUT).filter((f) => f.startsWith('frame-')).length
console.log(`✓ ${count} frames extraídos em public/scroll/`)
