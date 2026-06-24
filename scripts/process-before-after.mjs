// Normaliza as fotos reais de Antes/Depois enviadas pelo cliente:
// recorta no mesmo formato (16:10), otimiza em WebP e dá um leve realce — para "encaixarem" no site.
//
// 1) Salve as 6 fotos em: c:\Sites\prime-estofados-source\antes-depois\
//    com estes nomes (qualquer extensão .jpg/.png/.webp):
//      sofa-cinza-antes      sofa-cinza-depois
//      sofa-retratil-antes   sofa-retratil-depois
//      colchao-antes         colchao-depois
// 2) Rode: npm run process:antes-depois
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IN = path.resolve(__dirname, '../../prime-estofados-source/antes-depois')
const OUT = path.resolve(__dirname, '../public/imagens/antes-depois')

const W = 1200
const H = 750 // 16:10
const QUALITY = 82
const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG']

const BASENAMES = [
  'sofa-cinza-antes',
  'sofa-cinza-depois',
  'sofa-retratil-antes',
  'sofa-retratil-depois',
  'colchao-antes',
  'colchao-depois',
]

// Enquanto as fotos reais não chegam, geramos placeholders a partir das imagens existentes.
// (basename -> imagem base em public/imagens; nomes com "-antes" recebem um "envelhecimento")
const PLACEHOLDER = {
  'sofa-cinza-antes': 'imagem-inicial.webp',
  'sofa-cinza-depois': 'imagem-inicial.webp',
  'sofa-retratil-antes': 'estofados-em-geral.webp',
  'sofa-retratil-depois': 'estofados-em-geral.webp',
  'colchao-antes': 'colchoes.webp',
  'colchao-depois': 'colchoes.webp',
}
const PUB_IMG = path.resolve(__dirname, '../public/imagens')

function findInput(base) {
  for (const ext of EXTS) {
    const p = path.join(IN, base + ext)
    if (fs.existsSync(p)) return p
  }
  return null
}

fs.mkdirSync(IN, { recursive: true })
fs.mkdirSync(OUT, { recursive: true })

let real = 0
const placeholders = []
for (const base of BASENAMES) {
  const out = path.join(OUT, `${base}.webp`)
  const src = findInput(base)

  if (src) {
    // Foto real → realce sutil
    await sharp(src)
      .resize(W, H, { fit: 'cover', position: 'centre' })
      .modulate({ brightness: 1.02, saturation: 1.05 })
      .sharpen()
      .webp({ quality: QUALITY })
      .toFile(out)
    console.log(`✓ ${base}.webp (real)`)
    real++
  } else {
    // Placeholder a partir de uma imagem existente
    const baseImg = path.join(PUB_IMG, PLACEHOLDER[base])
    let pipe = sharp(baseImg).resize(W, H, { fit: 'cover', position: 'centre' })
    if (base.endsWith('-antes')) {
      pipe = pipe.modulate({ brightness: 0.8, saturation: 0.7 }).tint({ r: 226, g: 214, b: 196 })
    }
    await pipe.webp({ quality: QUALITY }).toFile(out)
    console.log(`· ${base}.webp (placeholder)`)
    placeholders.push(base)
  }
}

console.log(`\n${real}/${BASENAMES.length} fotos reais processadas → public/imagens/antes-depois/`)
if (placeholders.length) {
  console.log('\n! Ainda em placeholder. Salve as fotos reais em:\n   ' + IN)
  for (const m of placeholders) console.log('   - ' + m + '.(jpg|png|webp)')
  console.log('  e rode novamente: npm run process:antes-depois')
}
