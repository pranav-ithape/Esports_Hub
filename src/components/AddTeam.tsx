import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function AddTeam() {
  const [games, setGames] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    gameId: "",
    organizationId: "",
    rank: "",
    region: "",
    country: "",
    wins: "",
    losses: "",
    matchesPlayed: "",
    winRate: "",
  });

  // 🔥 Fetch games for dropdown
  useEffect(() => {
    const fetchGames = async () => {
      const snap = await getDocs(collection(db, "games"));

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGames(data);
    };

    fetchGames();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "teams"), {
        name: form.name,
        gameId: form.gameId,
        organizationId: form.organizationId,
        rank: Number(form.rank),
        region: form.region,
        country: form.country,
        stats: {
          wins: Number(form.wins),
          losses: Number(form.losses),
          matchesPlayed: Number(form.matchesPlayed),
          winRate: Number(form.winRate),
        },
        createdAt: new Date(),
      });

      alert("Team Added ✅");

      // reset
      setForm({
        name: "",
        gameId: "",
        organizationId: "",
        rank: "",
        region: "",
        country: "",
        wins: "",
        losses: "",
        matchesPlayed: "",
        winRate: "",
      });

    } catch (error) {
      console.error(error);
      alert("Error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl mb-6">Add Team</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">

        <input name="name" placeholder="Team Name" value={form.name} onChange={handleChange} className="p-2 bg-gray-900 border border-gray-700 rounded" />

        {/* GAME DROPDOWN */}
        <select name="gameId" value={form.gameId} onChange={handleChange} className="p-2 bg-gray-900 border border-gray-700 rounded">
          <option value="">Select Game</option>
          {games.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <input name="organizationId" placeholder="Organization ID" value={form.organizationId} onChange={handleChange} className="p-2 bg-gray-900 border border-gray-700 rounded" />

        <input name="rank" type="number" placeholder="Rank" value={form.rank} onChange={handleChange} className="p-2 bg-gray-900 border border-gray-700 rounded" />

        <input name="region" placeholder="Region (NA, EU, ASIA)" value={form.region} onChange={handleChange} className="p-2 bg-gray-900 border border-gray-700 rounded" />

        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className="p-2 bg-gray-900 border border-gray-700 rounded" />

        <h2 className="text-lg mt-4">Stats</h2>

        <input name="wins" type="number" placeholder="Wins" value={form.wins} onChange={handleChange} className="p-2 bg-gray-900 border border-gray-700 rounded" />

        <input name="losses" type="number" placeholder="Losses" value={form.losses} onChange={handleChange} className="p-2 bg-gray-900 border border-gray-700 rounded" />

        <input name="matchesPlayed" type="number" placeholder="Matches Played" value={form.matchesPlayed} onChange={handleChange} className="p-2 bg-gray-900 border border-gray-700 rounded" />

        <input name="winRate" type="number" placeholder="Win Rate (%)" value={form.winRate} onChange={handleChange} className="p-2 bg-gray-900 border border-gray-700 rounded" />

        <button className="bg-blue-600 p-2 rounded hover:bg-blue-700">
          Add Team
        </button>

      </form>
    </div>
  );
}