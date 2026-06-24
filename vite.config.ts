import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo é o site de usuário "prime-estofados.github.io" → servido da raiz do domínio.
// Por isso base = '/'. Se um dia mudar para um repo de projeto, ajuste para '/nome-do-repo/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
