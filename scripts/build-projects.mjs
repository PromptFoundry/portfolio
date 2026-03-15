import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(__dirname, '..')
const portfolioRoot = path.resolve(siteRoot, '..')
const publicProjects = path.join(siteRoot, 'public', 'projects')

const projects = [
  'arcis',
  'influencer-marketing-platform',
  'travelie',
  'ui-animations',
]

for (const name of projects) {
  const projectDir = path.join(portfolioRoot, name)
  const outDir = path.join(publicProjects, name)
  console.log(`\nBuilding ${name}...`)
  execSync(
    `npx vite build --base "/projects/${name}/" --outDir "${outDir}" --emptyOutDir`,
    { cwd: projectDir, stdio: 'inherit' }
  )
}

console.log('\nAll projects built.')
