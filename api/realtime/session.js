// Mints a short-lived Realtime client secret for the browser's WebRTC session.
// Uses the GA endpoint (/v1/realtime/client_secrets); the beta /v1/realtime/sessions
// endpoint and the dated preview models were removed by OpenAI.
// The mini model is roughly a third of the cost of gpt-realtime; marin is OpenAI's
// recommended high-quality voice.

const REALTIME_MODEL = 'gpt-realtime-2.1-mini'
const VOICE = 'marin'

// Best-effort abuse guard: this endpoint is public and every mint costs money.
// The map lives in one serverless instance's memory, so it resets on cold starts
// and isn't shared across instances; it slows casual abuse, it doesn't stop it.
const MAX_SESSIONS_PER_HOUR = 5
const WINDOW_MS = 60 * 60 * 1000
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  if (recent.length >= MAX_SESSIONS_PER_HOUR) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some(t => now - t < WINDOW_MS)) hits.delete(key)
    }
  }
  return false
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? 'unknown').split(',')[0].trim()
  if (rateLimited(ip)) {
    return res.status(429).json({ error: true, message: 'Voice assistant limit reached — try again in a bit.' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: true, message: 'OPENAI_API_KEY not set' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session: {
          type: 'realtime',
          model: REALTIME_MODEL,
          // The voice can't change after the first spoken reply, so it's fixed here
          audio: { output: { voice: VOICE } },
        },
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json({ error: true, message: data?.error?.message ?? 'Realtime session failed' })
    }
    // Only the ephemeral key leaves the server
    return res.status(200).json({ value: data.value, expires_at: data.expires_at })
  } catch (err) {
    return res.status(500).json({ error: true, message: String(err) })
  }
}
