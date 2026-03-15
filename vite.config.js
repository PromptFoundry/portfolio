import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-embedded-projects',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const match = req.url?.split('?')[0].match(/^\/projects\/([^/]+)(\/.*)?\/?$/)
          if (!match) return next()

          const projectName = match[1]
          const subPath = match[2] || '/'
          const projectDir = path.resolve(__dirname, 'public', 'projects', projectName)

          if (!fs.existsSync(projectDir)) return next()

          // Serve exact file if it exists
          const filePath = path.join(projectDir, subPath)
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return next()

          // Otherwise fall back to the project's index.html
          const indexPath = path.join(projectDir, 'index.html')
          if (fs.existsSync(indexPath)) {
            res.setHeader('Content-Type', 'text/html')
            res.end(fs.readFileSync(indexPath))
            return
          }

          next()
        })
      },
    },
  ],
  resolve: {
    alias: { '@': '/src' },
  },
})
