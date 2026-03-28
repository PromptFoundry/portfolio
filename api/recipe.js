export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: true, message: 'OPENAI_API_KEY not set' })
  }

  const { input } = req.body

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: `You are a professional chef and recipe writer.

Generate a REAL, cookable recipe based on the user request.

Follow ALL constraints:
- use provided ingredients when possible
- avoid excluded ingredients
- respect dietary rules
- respect time limits
- respect equipment limits

STEP RULES — very important:
- Group related actions into 3–6 meaningful stages. Do NOT create a separate step for every single action (e.g. do not split "season" and "sear" into two steps — combine them).
- Each step must have a short, evocative technique name (e.g. "Make the Sauce", "Sear the Meat", "Build the Bowl") and a full instruction paragraph.
- The instruction should be 2–5 sentences covering everything that happens in that stage.

OTHER RULES:
- If ingredients are listed, they must appear in the recipe
- If low carb is requested, avoid pasta, bread, sugar
- Keep steps realistic and sequential

Return ONLY valid JSON in this exact format:

{
  "title": "",
  "description": "",
  "prep_time": "",
  "cook_time": "",
  "total_time": "",
  "servings": "",
  "ingredients": [
    { "name": "", "amount": "", "unit": "" }
  ],
  "steps": [
    { "technique": "", "instruction": "" }
  ],
  "tips": [],
  "substitutions": []
}

No markdown. No explanation. JSON only.`,
        },
        { role: 'user', content: input },
      ],
    }),
  })

  const data = await response.json()

  if (data.error) {
    return res.status(500).json({ error: true, message: data.error.message })
  }

  const content = data.choices[0].message.content

  try {
    const recipe = JSON.parse(content)
    return res.status(200).json(recipe)
  } catch {
    return res.status(200).json({ error: true, raw: content })
  }
}
