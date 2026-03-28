export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: true, message: 'OPENAI_API_KEY not set' })
  }

  const { text, voice = 'coral' } = req.body

  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini-tts',
        input: text,
        voice,
        instructions:
          'Speak warmly and naturally, like a knowledgeable friend in the kitchen. Use a calm, confident pace. Keep your tone conversational and encouraging. Speak in short, clear sentences. Never sound like you are reading a list.',
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      return res.status(response.status).json({ error: true, message: errText })
    }

    const audioBuffer = await response.arrayBuffer()
    res.setHeader('Content-Type', 'audio/mpeg')
    return res.status(200).send(Buffer.from(audioBuffer))
  } catch (err) {
    return res.status(500).json({ error: true, message: String(err) })
  }
}
