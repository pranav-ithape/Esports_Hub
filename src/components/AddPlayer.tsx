import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function AddPlayer() {
  const [games, setGames] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    nickname: "",
    gameId: "",
    teamId: "",
    country: "",
    role: "",
    born: "",
    image: "",
    rating: "",
    kd: "",
    adr: "",
    headshot: "",
    clutches: "",
    mvps: "",
    earnings: "",
  });

  // 🔥 FETCH GAMES
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

  // 🔥 FETCH TEAMS
  useEffect(() => {
    const fetchTeams = async () => {
      const snap = await getDocs(collection(db, "teams"));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeams(data);
    };
    fetchTeams();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.gameId || !form.teamId) {
      alert("Select game & team ❌");
      return;
    }

    try {
      await addDoc(collection(db, "players"), {
        name: form.name,
        originalname: form.nickname,
        gameId: form.gameId,
        teamId: form.teamId, // ✅ CORRECT
        country: form.country,
        role: form.role,
        born: form.born,
        image: form.image,

        rank: 0,

        stats: {
          rating: Number(form.rating || 0),
          kd: Number(form.kd || 0),
          adr: Number(form.adr || 0),
          headshotPercent: Number(form.headshot || 0),
          clutches: Number(form.clutches || 0),
          mvps: Number(form.mvps || 0),
          earnings: Number(form.earnings || 0),
        },

        createdAt: new Date(),
      });

      alert("Player Added ✅");

      // RESET
      setForm({
        name: "",
        nickname: "",
        gameId: "",
        teamId: "",
        country: "",
        role: "",
        born: "",
        image: "",
        rating: "",
        kd: "",
        adr: "",
        headshot: "",
        clutches: "",
        mvps: "",
        earnings: "",
      });

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  // 🔥 FILTER TEAMS BASED ON GAME
  const filteredTeams = teams.filter(
    (t) => t.gameId === form.gameId
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Add Player</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 bg-gray-900 rounded" />

        <input name="nickname" placeholder="Nickname" value={form.nickname} onChange={handleChange} className="p-2 bg-gray-900 rounded" />

        {/* GAME */}
        <select name="gameId" value={form.gameId} onChange={handleChange} className="p-2 bg-gray-900 rounded">
          <option value="">Select Game</option>
          {games.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* 🔥 TEAM DROPDOWN */}
        <select name="teamId" value={form.teamId} onChange={handleChange} className="p-2 bg-gray-900 rounded">
          <option value="">Select Team</option>

          {filteredTeams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <input name="country" placeholder="Nationality" value={form.country} onChange={handleChange} className="p-2 bg-gray-900 rounded" />

        <input name="role" placeholder="Role (IGL...)" value={form.role} onChange={handleChange} className="p-2 bg-gray-900 rounded" />

        <input name="born" placeholder="Born Year" value={form.born} onChange={handleChange} className="p-2 bg-gray-900 rounded" />

        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="p-2 bg-gray-900 rounded" />

        {/* STATS */}
        <input name="rating" placeholder="Rating" onChange={handleChange} className="p-2 bg-gray-900 rounded" />
        <input name="kd" placeholder="KD" onChange={handleChange} className="p-2 bg-gray-900 rounded" />
        <input name="adr" placeholder="ADR" onChange={handleChange} className="p-2 bg-gray-900 rounded" />
        <input name="headshot" placeholder="Headshot %" onChange={handleChange} className="p-2 bg-gray-900 rounded" />
        <input name="clutches" placeholder="Clutches" onChange={handleChange} className="p-2 bg-gray-900 rounded" />
        <input name="mvps" placeholder="MVPs" onChange={handleChange} className="p-2 bg-gray-900 rounded" />
        <input name="earnings" placeholder="Prize Money" onChange={handleChange} className="p-2 bg-gray-900 rounded" />

        <button className="bg-purple-600 p-2 rounded">
          Add Player
        </button>

      </form>
    </div>
  );
}