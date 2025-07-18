import { useState } from 'react';

export default function ItineraryPlanner() {
  const [form, setForm] = useState({ destination: '', days: '', budget: '' });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    const prompt = `Create a ${form.days}-day travel itinerary for ${form.destination} in Nepal. The total budget is ${form.budget}. Include sightseeing, cultural spots, local food, and rest days. Format it day-wise.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.reply) {
        setResult(data.reply);
      } else {
        setResult("❌ GPT did not return a valid response.");
      }
    } catch (error) {
      console.error(error);
      setResult("⚠️ Error generating itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: 'auto' }}>
      <h1>🧠 Yatra Nepal AI – Smart Itinerary Generator</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          name="destination"
          placeholder="Destination (e.g., Pokhara)"
          onChange={handleChange}
          required
        />
        <input
          name="days"
          placeholder="Days (e.g., 5)"
          onChange={handleChange}
          required
        />
        <input
          name="budget"
          placeholder="Budget (e.g., $500)"
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </form>

      {result && (
        <div style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
          <h3>🗺️ Your Itinerary:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}