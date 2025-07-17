import { useState } from 'react';

export default function Assistant() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const askGPT = async () => {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>TravelPlannerGPT 🧳</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask your travel question..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={askGPT} style={{ padding: '10px 20px' }}>
        Ask
      </button>
      <p style={{ marginTop: '20px' }}>
        <strong>Response:</strong> {response}
      </p>
    </div>
  );
}