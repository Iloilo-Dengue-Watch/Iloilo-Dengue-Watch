import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  viteBasicSslPlugin({
    cert: 'cert.pem',
    key: 'key.pem'
  })
  ],
  server: {
    https: true
  }
})
