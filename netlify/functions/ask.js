import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ⁠ Bearer ${process.env.OPENAI_API_KEY} ⁠,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful travel assistant for tourists visiting Nepal. Answer with friendliness and expert-level local knowledge.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('Error from OpenAI:', error);
    res.status(500).json({ error: 'Something went wrong with the AI response.' });
  }
}