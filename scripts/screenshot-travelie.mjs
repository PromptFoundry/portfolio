/**
 * Captures dark-mode screenshots of Travelie.
 * Run from /site:  node scripts/screenshot-travelie.mjs
 * Requires the Travelie dev server running at http://localhost:4177
 */

import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT        = path.resolve(__dirname, '../public/images/travelie')
const BASE       = 'http://localhost:4177/'
const W          = 1440
const H          = 900
const MOBILE_W   = 390
const MOBILE_H   = 844

const delay = (ms) => new Promise(r => setTimeout(r, ms))

async function boot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page    = await browser.newPage()
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 })
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('travelie-theme', 'dark')
  })
  return { browser, page }
}

async function shot(page, filename) {
  await page.screenshot({ path: path.join(OUT, filename), clip: { x: 0, y: 0, width: W, height: H } })
  console.log(`  ✓  ${filename}`)
}

async function run() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })

  // ── Desktop screenshots (1440×900) ────────────────────────────────────────
  console.log('\n── Desktop screenshots ──')
  const desk = await browser.newPage()
  await desk.setViewport({ width: W, height: H, deviceScaleFactor: 2 })
  await desk.evaluateOnNewDocument(() => localStorage.setItem('travelie-theme', 'dark'))

  console.log('\n[1/3] home — dashboard')
  await desk.goto(BASE + '?page=dashboard', { waitUntil: 'networkidle2', timeout: 20000 })
  await delay(1200)
  await shot(desk, 'home.png')

  console.log('\n[2/3] plan-trip — AI trip planner')
  await desk.goto(BASE + '?page=plan', { waitUntil: 'networkidle2', timeout: 20000 })
  await delay(1000)
  await shot(desk, 'plan-trip.png')

  console.log('\n[3/3] explore — packages & itineraries')
  await desk.goto(BASE + '?page=packages', { waitUntil: 'networkidle2', timeout: 20000 })
  await delay(1000)
  await shot(desk, 'explore.png')

  // ── Mobile screenshots (390×844) ──────────────────────────────────────────
  console.log('\n── Mobile screenshots ──')
  const mob = await browser.newPage()
  await mob.setViewport({ width: MOBILE_W, height: MOBILE_H, deviceScaleFactor: 3 })
  await mob.evaluateOnNewDocument(() => localStorage.setItem('travelie-theme', 'dark'))

  console.log('\n[4/6] home-mobile — dashboard')
  await mob.goto(BASE + '?page=dashboard', { waitUntil: 'networkidle2', timeout: 20000 })
  await delay(1200)
  await mob.screenshot({ path: path.join(OUT, 'home-mobile.png'), clip: { x: 0, y: 0, width: MOBILE_W, height: MOBILE_H } })
  console.log('  ✓  home-mobile.png')

  console.log('\n[5/6] plan-trip-mobile')
  await mob.goto(BASE + '?page=plan', { waitUntil: 'networkidle2', timeout: 20000 })
  await delay(1000)
  await mob.screenshot({ path: path.join(OUT, 'plan-trip-mobile.png'), clip: { x: 0, y: 0, width: MOBILE_W, height: MOBILE_H } })
  console.log('  ✓  plan-trip-mobile.png')

  console.log('\n[6/6] explore-mobile')
  await mob.goto(BASE + '?page=packages', { waitUntil: 'networkidle2', timeout: 20000 })
  await delay(1000)
  await mob.screenshot({ path: path.join(OUT, 'explore-mobile.png'), clip: { x: 0, y: 0, width: MOBILE_W, height: MOBILE_H } })
  console.log('  ✓  explore-mobile.png')

  await browser.close()
  console.log('\n✅  All 6 screenshots saved to', OUT)
}

run().catch(err => {
  console.error('\n❌  Screenshot script failed:', err.message)
  process.exit(1)
})
