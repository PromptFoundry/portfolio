export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: true, answer: "Sorry, the AI assistant isn't configured." })
  }

  const { question, recipeContext } = req.body

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.5,
        messages: [
          {
            role: 'system',
            content: `You are a helpful, friendly kitchen assistant. The user is actively cooking. Answer their spoken question concisely — 1 to 3 sentences max, since your response will be read aloud. Be practical and direct. Here is the full recipe context:\n\n${recipeContext}`,
          },
          { role: 'user', content: question },
        ],
      }),
    })
    const data = await response.json()
    const answer = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't answer that."
    return res.status(200).json({ answer })
  } catch {
    return res.status(500).json({ error: true, answer: 'Something went wrong.' })
  }
}
