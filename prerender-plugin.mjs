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
    readyTimeout = 30000,
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
        const blockedHosts = /googlesyndication\.com|doubleclick\.net|googleadservices\.com|googletagservices\.com|google-analytics\.com|googletagmanager\.com|fundingchoicesmessages\.google\.com/
        const blockedTypes = new Set(['image', 'media', 'font'])
        const workers = Array.from({ length: Math.min(maxConcurrentRoutes, routes.length) }, async () => {
          const page = await browser.newPage()
          // Abort ad/analytics requests — the script tags must remain in the DOM
          // for verification (AdSense crawls the HTML), but loading them during
          // prerender blocks networkidle0 and hangs the build on ad-blocked CI networks.
          // Images, fonts, and media are also aborted — only the DOM is captured,
          // and skipping their downloads lets networkidle0 settle much sooner.
          await page.setRequestInterception(true)
          page.on('request', (req) => {
            if (blockedHosts.test(req.url()) || blockedTypes.has(req.resourceType())) {
              req.abort()
            } else {
              req.continue()
            }
          })
          while (queue.length > 0) {
            const route = queue.shift()
            const renderedRoute = {
              route,
              originalRoute: route,
              html: null,
              outputPath: path.join(staticDir, route, 'index.html'),
            }
            await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle0', timeout: 90000 })
            // Wait for real content instead of sleeping a fixed interval: the
            // Suspense fallback is marked data-prerender-loading, so this only
            // resolves once the lazy route chunk (already fetched, per
            // networkidle0) has committed its render.
            try {
              await page.waitForFunction(
                () => {
                  const root = document.getElementById('root')
                  return (
                    root &&
                    root.children.length > 0 &&
                    !root.querySelector('[data-prerender-loading]')
                  )
                },
                { timeout: readyTimeout }
              )
            } catch {
              console.warn(`[prerender] Readiness check timed out for ${route} — capturing anyway`)
            }
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
