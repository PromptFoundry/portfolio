export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const pexelsKey = process.env.PEXELS_API_KEY
  if (!pexelsKey) {
    return res.status(500).json({ imageUrl: null, imageUrls: [] })
  }

  const { query = 'food', count = '1' } = req.query
  const numCount = Math.min(parseInt(count, 10), 8)

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${numCount}&orientation=landscape`,
      { headers: { Authorization: pexelsKey } }
    )
    const data = await response.json()

    if (numCount === 1) {
      const imageUrl = data.photos?.[0]?.src?.large ?? null
      return res.status(200).json({ imageUrl })
    } else {
      const imageUrls = (data.photos ?? []).map((p) => p.src.large)
      return res.status(200).json({ imageUrls })
    }
  } catch {
    return res.status(500).json({ imageUrl: null, imageUrls: [] })
  }
}
