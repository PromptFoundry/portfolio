// Pexels photo search with candidate ranking.
//
// GET /api/image?query=…&count=1..8&orientation=landscape|portrait|square&exclude=id,id
//
// Fetches a pool of candidates and ranks them instead of taking the first hit:
// alt-text overlap with the query, resolution, fit to the requested orientation,
// and Pexels' own relevance order as a tiebreak. Photos of people are demoted
// unless the query asks for them.
//
// Response: { photos: Photo[], imageUrl, imageUrls } — imageUrl/imageUrls kept
// for older clients.

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'in', 'on', 'of', 'with', 'for', 'to', 'at', 'by',
  'food', 'dish', 'close', 'up', 'overhead', 'top', 'view', 'shot', 'photo', 'plated',
])
const PEOPLE = /\b(person|people|man|men|woman|women|girl|boy|child|kid|couple|family|chef|cook|portrait|smiling|selfie|crowd)\b/
const ORIENTATIONS = new Set(['landscape', 'portrait', 'square'])
const POOL_SIZE = 15

const tokens = (s) =>
  (s || '').toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP_WORDS.has(w))

// Light stemming so "tomatoes" matches "tomato", "simmering" matches "simmer"
const stem = (w) => w.replace(/(ies|es|s|ing|ed)$/, '')

function score(photo, index, queryTokens, orientation, wantsPeople) {
  const alt = (photo.alt || '').toLowerCase()
  const altStems = new Set(tokens(alt).map(stem))

  // Relevance: share of query words the photo's description mentions
  const hits = queryTokens.filter((t) => altStems.has(stem(t))).length
  const relevance = queryTokens.length ? hits / queryTokens.length : 0

  // Quality: enough pixels for a 2x tall slot
  const shortSide = Math.min(photo.width, photo.height)
  const resolution = shortSide >= 2400 ? 1 : shortSide >= 1600 ? 0.6 : 0.2

  // Fit to the slot it's going into
  const ratio = photo.width / photo.height
  const fit =
    orientation === 'portrait' ? (ratio <= 0.85 ? 1 : 0.3)
    : orientation === 'landscape' ? (ratio >= 1.2 ? 1 : 0.3)
    : orientation === 'square' ? (Math.abs(ratio - 1) < 0.25 ? 1 : 0.4)
    : 0.6

  const rank = 1 - index / POOL_SIZE
  const peoplePenalty = !wantsPeople && PEOPLE.test(alt) ? 0.8 : 0

  return relevance * 3 + resolution * 0.8 + fit * 0.7 + rank * 0.6 - peoplePenalty
}

function toPhoto(p) {
  return {
    id: p.id,
    width: p.width,
    height: p.height,
    avgColor: p.avg_color || null,
    alt: p.alt || '',
    photographer: p.photographer,
    photographerUrl: p.photographer_url,
    pexelsUrl: p.url,
    // Documented Pexels variants only — the client picks one per slot
    src: {
      large2x: p.src.large2x,
      large: p.src.large,
      portrait: p.src.portrait,
      landscape: p.src.landscape,
      tiny: p.src.tiny,
    },
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const pexelsKey = process.env.PEXELS_API_KEY
  if (!pexelsKey) {
    return res.status(500).json({ photos: [], imageUrl: null, imageUrls: [] })
  }

  const { query = 'food', count = '1', orientation = '', exclude = '' } = req.query
  const numCount = Math.max(1, Math.min(parseInt(count, 10) || 1, 8))
  const orient = ORIENTATIONS.has(orientation) ? orientation : ''
  const excluded = new Set(String(exclude).split(',').filter(Boolean).map(Number))

  const params = new URLSearchParams({ query, per_page: String(POOL_SIZE) })
  if (orient) params.set('orientation', orient)

  try {
    const response = await fetch(`https://api.pexels.com/v1/search?${params}`, {
      headers: { Authorization: pexelsKey },
    })
    const data = await response.json()

    const queryTokens = tokens(query)
    const wantsPeople = PEOPLE.test(query.toLowerCase())
    const ranked = (data.photos ?? [])
      .map((p, i) => ({ p, s: score(p, i, queryTokens, orient, wantsPeople) }))
      .filter(({ p }) => !excluded.has(p.id))
      .sort((a, b) => b.s - a.s)
      .slice(0, numCount)
      .map(({ p }) => toPhoto(p))

    // Same query → same answer for a day; lets Vercel's edge cache absorb repeats
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
    return res.status(200).json({
      photos: ranked,
      imageUrl: ranked[0]?.src.large ?? null,
      imageUrls: ranked.map((p) => p.src.large),
    })
  } catch {
    return res.status(500).json({ photos: [], imageUrl: null, imageUrls: [] })
  }
}
