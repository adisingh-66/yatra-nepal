import { useState } from 'react';

export default function Assistant() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const askGPT = async () => {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div>
      <h2>TravelPlannerGPT</h2>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask your travel question..." />
      <button onClick={askGPT}>Ask</button>
      <p><strong>Response:</strong> {response}</p>
    </div>
  );
}
