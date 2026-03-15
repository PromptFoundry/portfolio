/**
 * Captures screenshots of the Arcis UI Kit in specific states.
 * Run from /site:  node scripts/screenshot-arcis.mjs
 * Requires the Vite dev server running at http://localhost:5173
 */

import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '../public/images/arcis')
const BASE = 'http://localhost:5173/projects/arcis/'
const W = 1440
const H = 900

async function boot() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 })
  return { browser, page }
}

/** Click the theme switcher button for a given label, e.g. "Augusta" */
async function setTheme(page, label) {
  await page.click(`button[title="${label}"]`)
  await delay(400)
}

/** Click the light/dark toggle. Pass 'dark' or 'light' for the desired mode. */
async function setMode(page, desired) {
  const btn = await page.$('header button[title^="Switch to"]')
  if (!btn) return
  const title = await btn.evaluate(el => el.title)
  // title is "Switch to dark mode" or "Switch to light mode"
  // The button's current mode is the *opposite* of what title says
  const current = title.includes('dark') ? 'light' : 'dark'
  if (current !== desired) {
    await btn.click()
    await delay(500)
  }
}

/** Click a sidebar nav item by its exact text */
async function navTo(page, text) {
  const clicked = await page.evaluate((label) => {
    const btns = Array.from(document.querySelectorAll('aside button'))
    const btn = btns.find(b => b.textContent.trim() === label)
    if (btn) { btn.click(); return true }
    return false
  }, text)
  if (!clicked) console.warn(`  ⚠  sidebar item "${text}" not found`)
  await delay(600)
}

/** Click the top center tab (UI Kit or Templates) */
async function setTab(page, label) {
  const clicked = await page.evaluate((lbl) => {
    // The two tab buttons are absolutely positioned in the header center
    const btns = Array.from(document.querySelectorAll('header button'))
    const btn = btns.find(b => b.textContent.trim() === lbl)
    if (btn) { btn.click(); return true }
    return false
  }, label)
  if (!clicked) console.warn(`  ⚠  tab "${label}" not found`)
  await delay(500)
}

/** Scroll to top of main content area */
async function scrollTop(page) {
  await page.evaluate(() => {
    const main = document.querySelector('main')
    if (main) main.scrollTop = 0
  })
  await delay(100)
}

const delay = (ms) => new Promise(r => setTimeout(r, ms))

async function shot(page, filename) {
  await page.screenshot({ path: path.join(OUT, filename), clip: { x: 0, y: 0, width: W, height: H } })
  console.log(`  ✓  ${filename}`)
}

async function run() {
  const { browser, page } = await boot()

  console.log('Loading app...')
  await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 20000 })
  await delay(1000)

  // ── 1. hero-variants.png ─────────────────────────────────────────────────
  // UI Kit › Hero Sections › Augusta dark
  console.log('\n[1/6] hero-variants — augusta dark, hero sections')
  await setTab(page, 'UI Kit')
  await setTheme(page, 'Augusta')
  await setMode(page, 'dark')
  await navTo(page, 'Hero Sections')
  await scrollTop(page)
  await delay(400)
  await shot(page, 'hero-variants.png')

  // ── 2. pro-shop.png ──────────────────────────────────────────────────────
  // UI Kit › Pro Shop › Bordeaux dark
  console.log('\n[2/6] pro-shop — bordeaux dark, pro shop section')
  await setTheme(page, 'Bordeaux')
  await setMode(page, 'dark')
  await navTo(page, 'Pro Shop')
  await scrollTop(page)
  await delay(400)
  await shot(page, 'pro-shop.png')

  // ── 3. footer-testimonial.png ────────────────────────────────────────────
  // UI Kit › Testimonials › Augusta light
  console.log('\n[3/6] footer-testimonial — augusta light, testimonials')
  await setTheme(page, 'Augusta')
  await setMode(page, 'light')
  await navTo(page, 'Testimonials')
  await scrollTop(page)
  await delay(400)
  await shot(page, 'footer-testimonial.png')

  // ── 4. design-tokens.png ─────────────────────────────────────────────────
  // UI Kit › All Components (overview) › Coastal light — theme switcher visible
  console.log('\n[4/6] design-tokens — coastal light, overview (theme switcher prominent)')
  await setMode(page, 'light')
  await navTo(page, 'All Components')
  await delay(300)
  await setTheme(page, 'Coastal')
  await delay(400)
  await scrollTop(page)
  await shot(page, 'design-tokens.png')

  // ── 5. template-grid.png ─────────────────────────────────────────────────
  // Templates tab › augusta light — template selection grid
  console.log('\n[5/6] template-grid — augusta light, templates tab')
  await setTheme(page, 'Augusta')
  await setMode(page, 'light')
  await setTab(page, 'Templates')
  await delay(600)
  await scrollTop(page)
  await shot(page, 'template-grid.png')

  // ── 6. classic-club-preview.png ──────────────────────────────────────────
  // Templates tab › select Classic Club › Augusta dark — configurator preview
  console.log('\n[6/6] classic-club-preview — augusta dark, classic club configurator')
  // Mode toggle is always in the header — set dark first
  await setMode(page, 'dark')
  await delay(300)

  // Click the first "Customize Template" button — enters TemplateConfigurator
  // ThemeSwitcher only exists inside TemplateConfigurator, so set theme after
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'))
    const btn = btns.find(b => b.textContent.trim().includes('Customize Template'))
    if (btn) { btn.click(); return true }
    return false
  })
  if (!clicked) console.warn('  ⚠  "Customize Template" button not found — falling back to current view')
  await delay(900)

  // Now ThemeSwitcher is mounted inside TemplateConfigurator — set Augusta
  await setTheme(page, 'Augusta')
  await scrollTop(page)
  await shot(page, 'classic-club-preview.png')

  await browser.close()
  console.log('\n✅  All 6 screenshots saved to', OUT)
}

run().catch(err => {
  console.error('\n❌  Screenshot script failed:', err.message)
  process.exit(1)
})
