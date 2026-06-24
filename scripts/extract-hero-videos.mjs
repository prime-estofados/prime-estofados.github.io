// Extrai frames WebP dos 3 vídeos do hero (efeito scroll-vídeo).
// Hoje usa clipes HD de banco (Pexels/Mixkit) compatíveis com cada etapa,
// porque os vídeos originais do cliente vieram em ~480p (comprimidos) e
// ficavam borrados em tela cheia. Para voltar a usar vídeos reais, basta
// trocar os arquivos em SRC mantendo as mesmas chaves.
// Uso: npm run extract:hero
import ffmpegPath from 'ffmpeg-static'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_ROOT = path.resolve(__dirname, '../public/scroll')
const SRC = process.env.PRIME_SRC || 'C:/Sites/prime-estofados-source/stock'

const FRAMES_PER_SEGMENT = 60 // precisa bater com HERO_SEGMENTS em src/lib/frames.ts
const MAX_WIDTH = 1600 // largura máxima dos frames (sem upscale acima da fonte)

// start/end: janela (em s) do clipe a ser amostrada (pega o melhor trecho).
const SEGMENTS = [
  { key: 'limpeza', file: 'limpeza.mp4', start: 0.3, end: 11.2 }, // extratora no sofá
  { key: 'impermeabilizacao', file: 'impermeabilizacao.mp4', start: 1.0, end: 8.0 }, // água repelindo
  { key: 'resultado', file: 'resultado.mp4', start: 0.5, end: 12.5 }, // sofá limpo
]
const KEYS = new Set(SEGMENTS.map((s) => s.key))

function probeDuration(file) {
  const res = spawnSync(ffmpegPath, ['-i', file], { encoding: 'utf-8' })
  const m = `${res.stderr || ''}`.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/)
  if (!m) return null
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3])
}

let ok = true
for (const seg of SEGMENTS) {
  const input = path.join(SRC, seg.file)
  if (!fs.existsSync(input)) {
    console.error(`✗ Vídeo não encontrado: ${input}`)
    ok = false
    continue
  }

  const outDir = path.join(OUT_ROOT, seg.key)
  fs.mkdirSync(outDir, { recursive: true })
  for (const f of fs.readdirSync(outDir)) if (f.startsWith('frame-')) fs.rmSync(path.join(outDir, f))

  const full = probeDuration(input) || 0
  const start = Math.max(0, seg.start || 0)
  const end = Math.min(seg.end ?? full, full || seg.end || 0)
  const window = Math.max(0.5, end - start)
  const fps = (FRAMES_PER_SEGMENT / window).toFixed(4)

  console.log(`• ${seg.key}: ${seg.file} [${start}s–${end}s] → ${FRAMES_PER_SEGMENT} frames @ fps=${fps}`)

  const args = [
    '-ss', String(start),
    '-i', input,
    '-vf', `fps=${fps},scale=min(${MAX_WIDTH}\\,iw):-2:flags=lanczos`,
    '-frames:v', String(FRAMES_PER_SEGMENT),
    '-c:v', 'libwebp',
    '-quality', '82',
    '-y',
    path.join(outDir, 'frame-%04d.webp'),
  ]
  const run = spawnSync(ffmpegPath, args, { stdio: 'inherit' })
  if (run.status !== 0) {
    console.error(`✗ ffmpeg falhou em ${seg.file}`)
    ok = false
    continue
  }
  const count = fs.readdirSync(outDir).filter((f) => f.startsWith('frame-')).length
  console.log(`  ✓ ${count} frames em public/scroll/${seg.key}/`)
}

// Limpa frames planos antigos e subpastas de segmentos que não existem mais.
for (const f of fs.readdirSync(OUT_ROOT)) {
  const full = path.join(OUT_ROOT, f)
  if (f.startsWith('frame-') && f.endsWith('.webp')) fs.rmSync(full)
  else if (fs.statSync(full).isDirectory() && !KEYS.has(f)) fs.rmSync(full, { recursive: true, force: true })
}

if (!ok) process.exit(1)
console.log('\n✓ Frames dos 3 clipes extraídos. Total:', FRAMES_PER_SEGMENT * SEGMENTS.length)
