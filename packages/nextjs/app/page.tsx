"use client";

import { useState } from "react";

export default function HomePage() {
  const [telegramId, setTelegramId] = useState("");
  const [token, setToken] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    const res = await fetch("/api/add-watch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telegramId,
        token,
        targetPrice: parseFloat(targetPrice),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("✅ Watch added successfully!");
      setTelegramId("");
      setToken("");
      setTargetPrice("");
    } else {
      setStatus(`❌ Error: ${data.error || "Unknown error"}`);
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📈 Add Token to Watchlist</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Telegram ID"
          value={telegramId}
          onChange={e => setTelegramId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Token Symbol or Address"
          value={token}
          onChange={e => setToken(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Target Price (e.g. 2500)"
          value={targetPrice}
          onChange={e => setTargetPrice(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add to Watchlist
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </main>
  );
}
