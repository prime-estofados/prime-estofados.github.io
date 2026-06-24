// Converte as imagens originais (PNG pesados) para WebP otimizado em public/imagens.
// Uso: npm run optimize:images
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC = path.resolve(__dirname, '../../prime-estofados-source/Imagens')
const OUT = path.resolve(__dirname, '../public/imagens')

// origem (no repo antigo) -> slug de saída
const MAP = {
  'imagem inicial.png': 'imagem-inicial',
  'Estofados em geral.png': 'estofados-em-geral',
  'Colchoes.png': 'colchoes',
  'cadeiras.png': 'cadeiras',
  'Poltronas.png': 'poltronas',
  'Automotiva.png': 'automotiva',
  'Tapetes e carpetes.png': 'tapetes-e-carpetes',
  'Puffs.png': 'puffs',
  'Impermeabilização.png': 'impermeabilizacao',
}

const MAX_WIDTH = 1200
const QUALITY = 78

fs.mkdirSync(OUT, { recursive: true })

if (!fs.existsSync(SRC)) {
  console.error(`✗ Pasta de origem não encontrada: ${SRC}`)
  console.error('  Garanta que o repo antigo está clonado em c:/Sites/prime-estofados-source')
  process.exit(1)
}

for (const [srcName, slug] of Object.entries(MAP)) {
  const srcPath = path.join(SRC, srcName)
  if (!fs.existsSync(srcPath)) {
    console.warn(`! Pulando (não encontrado): ${srcName}`)
    continue
  }
  const outPath = path.join(OUT, `${slug}.webp`)
  await sharp(srcPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath)
  const kb = (fs.statSync(outPath).size / 1024).toFixed(0)
  console.log(`✓ ${slug}.webp (${kb} KB)`)
}

// Logo: mantém PNG (transparência) reduzido + versão webp.
const logoSrc = path.join(SRC, 'Logo.png')
if (fs.existsSync(logoSrc)) {
  await sharp(logoSrc).resize({ height: 220, withoutEnlargement: true }).png({ quality: 90 }).toFile(path.join(OUT, 'logo.png'))
  await sharp(logoSrc).resize({ height: 220, withoutEnlargement: true }).webp({ quality: 90 }).toFile(path.join(OUT, 'logo.webp'))
  console.log('✓ logo.png + logo.webp')
}

console.log('\nConcluído. Imagens em public/imagens/')
