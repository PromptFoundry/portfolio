import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Keys the api/ functions read. In production they come from Vercel's project
// settings; in dev they're read from Savora's .env so they aren't copied here.
const API_ENV_KEYS = ['OPENAI_API_KEY', 'PEXELS_API_KEY']
const API_ENV_DIR = path.resolve(__dirname, '..', 'savora')

// Runs the Vercel functions in api/ under the dev server, so the embedded
// prototypes (e.g. Savora) can call /api/* locally. Dev only: Vercel serves
// these in production.
function devApiRoutes() {
  const apiDir = path.resolve(__dirname, 'api')

  const readBody = async req => {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const raw = Buffer.concat(chunks).toString()
    if (!raw) return undefined
    if (req.headers['content-type']?.includes('application/json')) {
      try { return JSON.parse(raw) } catch { return raw }
    }
    return raw
  }

  // Vercel-style response helpers on top of Node's ServerResponse
  const enhance = res => {
    res.status = code => { res.statusCode = code; return res }
    res.json = body => {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(body))
      return res
    }
    res.send = body => {
      if (Buffer.isBuffer(body) || typeof body === 'string') res.end(body)
      else res.json(body)
      return res
    }
    return res
  }

  return {
    name: 'dev-api-routes',
    apply: 'serve',
    config(_, { mode }) {
      const env = loadEnv(mode, API_ENV_DIR, '')
      const missing = []
      for (const key of API_ENV_KEYS) {
        if (process.env[key]) continue
        if (env[key]) process.env[key] = env[key]
        else missing.push(key)
      }
      if (missing.length) {
        console.warn(`[dev-api-routes] ${missing.join(', ')} not found in ${API_ENV_DIR}/.env; those /api routes will fail locally.`)
      }
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const [pathname, search = ''] = (req.url ?? '').split('?')
        if (!pathname.startsWith('/api/')) return next()

        // Unknown routes 404 like they do on Vercel, rather than falling through to the SPA
        const match = pathname.match(/^\/api\/([a-z0-9/_-]+?)\/?$/i)
        const file = match && path.resolve(apiDir, `${match[1]}.js`)
        if (!file || !file.startsWith(apiDir + path.sep) || !fs.existsSync(file)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: true, message: `No API route for ${pathname}` }))
          return
        }

        try {
          const mod = await server.ssrLoadModule(file)
          req.query = Object.fromEntries(new URLSearchParams(search))
          if (mod.config?.api?.bodyParser !== false) req.body = await readBody(req)
          await mod.default(req, enhance(res))
        } catch (err) {
          server.config.logger.error(`[dev-api-routes] ${pathname}: ${err.stack ?? err}`)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: true, message: String(err) }))
          }
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    devApiRoutes(),
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
