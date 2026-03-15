/**
 * Captures screenshots of the Orka AI agent builder.
 * Run from /site:  node scripts/screenshot-orka.mjs
 * Requires the Vite dev server running at http://localhost:5173
 */

import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT  = path.resolve(__dirname, '../public/images/orka')
const BASE = 'http://localhost:5173/projects/orka/'
const W    = 1440
const H    = 900

const delay = (ms) => new Promise(r => setTimeout(r, ms))

async function boot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page    = await browser.newPage()
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 })
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('orka-api-key', 'sk-placeholder')
    localStorage.setItem('orka-theme', 'dark')
  })
  return { browser, page }
}

async function shot(page, filename) {
  await page.screenshot({ path: path.join(OUT, filename), clip: { x: 0, y: 0, width: W, height: H } })
  console.log(`  ✓  ${filename}`)
}

async function clickButton(page, text) {
  const clicked = await page.evaluate((t) => {
    const btns = Array.from(document.querySelectorAll('button'))
    const btn  = btns.find(b => b.textContent.trim().includes(t))
    if (btn) { btn.click(); return true }
    return false
  }, text)
  if (!clicked) console.warn(`  ⚠  button "${text}" not found`)
  return clicked
}

async function run() {
  const { browser, page } = await boot()

  // ── 1. dashboard.png ─────────────────────────────────────────────────────
  console.log('\n[1/8] dashboard — agents overview')
  await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 20000 })
  await delay(1000)
  await shot(page, 'dashboard.png')

  // ── 2. workflow-builder.png ───────────────────────────────────────────────
  console.log('\n[2/8] workflow-builder — empty canvas')
  await clickButton(page, 'New Agent')
  await delay(1200)
  await shot(page, 'workflow-builder.png')

  // ── 3. workflow-generated.png ─────────────────────────────────────────────
  console.log('\n[3/8] workflow-generated — graph view after generation')
  const textarea = await page.$('textarea')
  if (textarea) {
    await textarea.click({ clickCount: 3 })
    await textarea.type('Monitor brand mentions and route alerts based on sentiment', { delay: 0 })
    await delay(200)
  }
  await clickButton(page, 'Generate Workflow')
  await delay(4000)
  await shot(page, 'workflow-generated.png')

  // ── 4. node-config.png ────────────────────────────────────────────────────
  console.log('\n[4/8] node-config — node inspector open')
  await page.mouse.click(635, 175)
  await delay(700)
  await shot(page, 'node-config.png')

  // Close node config by clicking canvas background
  await page.mouse.click(900, 450)
  await delay(300)

  // ── 5. intent-view.png ───────────────────────────────────────────────────
  console.log('\n[5/8] intent-view — Intent tab')
  await clickButton(page, 'Intent')
  await delay(600)
  await shot(page, 'intent-view.png')

  // ── 6. logic-view.png ────────────────────────────────────────────────────
  console.log('\n[6/8] logic-view — Logic tab')
  await clickButton(page, 'Logic')
  await delay(600)
  await shot(page, 'logic-view.png')

  // Back to Graph for test run
  await clickButton(page, 'Graph')
  await delay(400)

  // ── 7. test-run.png ──────────────────────────────────────────────────────
  console.log('\n[7/8] test-run — test execution panel')
  await clickButton(page, 'Test Run')
  await delay(5000) // wait for all steps to complete (7 nodes × ~380ms avg)
  await shot(page, 'test-run.png')

  // ── 8. sim-modal.png ─────────────────────────────────────────────────────
  console.log('\n[8/8] sim-modal — workflow simulation replay')
  await clickButton(page, 'Visualize')
  await delay(5000) // let replay reach mid-point (first few steps done)
  await shot(page, 'sim-modal.png')

  await browser.close()
  console.log('\n✅  All 8 screenshots saved to', OUT)
}

run().catch(err => {
  console.error('\n❌  Screenshot script failed:', err.message)
  process.exit(1)
})
