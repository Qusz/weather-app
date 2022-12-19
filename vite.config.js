import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "url"
import autoprefixer from 'autoprefixer'


export default defineConfig({
  plugins: [
    
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ],
    }
  },
  build: {
    target: 'es2015',
  }
})
