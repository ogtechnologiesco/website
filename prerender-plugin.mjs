import http from 'http'
import path from 'path'
import fs from 'fs'
import serveStatic from 'serve-static'
import { minify } from 'html-minifier-terser'

// Minimal local replacement for vite-plugin-prerender: serves the build output
// statically with an SPA fallback, crawls each route with Puppeteer, applies
// postProcess, minifies, and writes dist/<route>/index.html.
export default function prerenderPlugin(options) {
  const {
    staticDir,
    indexPath = path.join(staticDir, 'index.html'),
    routes = [],
    postProcess,
    minify: minifyOptions,
    renderAfterTime = 0,
    maxConcurrentRoutes = 4,
    launchOptions = {},
  } = options

  return {
    name: 'local-prerender',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      console.log(`[prerender] Rendering routes [${routes.join(', ')}] with puppeteer...`)

      const serve = serveStatic(staticDir)
      const server = http.createServer((req, res) => {
        serve(req, res, () => {
          res.setHeader('Content-Type', 'text/html')
          fs.createReadStream(indexPath).pipe(res)
        })
      })
      await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
      const baseURL = `http://127.0.0.1:${server.address().port}`

      const { default: puppeteer } = await import('puppeteer')
      const browser = await puppeteer.launch({ headless: true, ...launchOptions })
      try {
        const queue = [...routes]
        const workers = Array.from({ length: Math.min(maxConcurrentRoutes, routes.length) }, async () => {
          const page = await browser.newPage()
          while (queue.length > 0) {
            const route = queue.shift()
            const renderedRoute = {
              route,
              originalRoute: route,
              html: null,
              outputPath: path.join(staticDir, route, 'index.html'),
            }
            await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle0' })
            if (renderAfterTime > 0) {
              await new Promise((resolve) => setTimeout(resolve, renderAfterTime))
            }
            renderedRoute.html = await page.content()
            if (postProcess) await postProcess(renderedRoute)
            if (minifyOptions) renderedRoute.html = await minify(renderedRoute.html, minifyOptions)
            fs.mkdirSync(path.dirname(renderedRoute.outputPath), { recursive: true })
            fs.writeFileSync(renderedRoute.outputPath, renderedRoute.html.trim())
            console.log(`[prerender] Rendered ${route}`)
          }
          await page.close()
        })
        await Promise.all(workers)
      } finally {
        await browser.close()
        await new Promise((resolve) => server.close(resolve))
      }

      console.log('[prerender] All routes rendered successfully')
    },
  }
}
