// Mints a short-lived Realtime client secret for the browser's WebRTC session.
// Uses the GA endpoint (/v1/realtime/client_secrets); the beta /v1/realtime/sessions
// endpoint and the dated preview models were removed by OpenAI.
// "gpt-realtime" is the stable alias, so model updates don't break this again.

const REALTIME_MODEL = 'gpt-realtime'
const VOICE = 'coral'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
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
