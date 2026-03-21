import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddTournament() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    game: "",
    location: "",
    startDate: "",
    endDate: "",
    teams: "",
    prizePool: "",
    status: "upcoming",
    type: "international",
  });

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
      await addDoc(collection(db, "tournaments"), {
        name: form.name,
        description: form.description,
        game: form.game,
        location: form.location,
        startDate: new Date(form.startDate),
        endDate: new Date(form.endDate),
        participants: Number(form.teams),
        prizePool: Number(form.prizePool),
        status: form.status,
        type: form.type,
        createdAt: new Date(),
      });

      alert("Tournament Added ✅");

      // reset form
      setForm({
        name: "",
        description: "",
        game: "",
        location: "",
        startDate: "",
        endDate: "",
        teams: "",
        prizePool: "",
        status: "upcoming",
        type: "international",
      });

    } catch (error) {
      console.error(error);
      alert("Error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Add Tournament</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">

        {/* NAME */}
        <input
          name="name"
          placeholder="Tournament Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 bg-gray-900 border border-gray-700 rounded"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-2 bg-gray-900 border border-gray-700 rounded"
        />

        {/* GAME */}
        <input
          name="game"
          placeholder="Game (CS2, PUBG...)"
          value={form.game}
          onChange={handleChange}
          className="p-2 bg-gray-900 border border-gray-700 rounded"
        />

        {/* LOCATION */}
        <input
          name="location"
          placeholder="Location (e.g. Los Angeles, USA)"
          value={form.location}
          onChange={handleChange}
          className="p-2 bg-gray-900 border border-gray-700 rounded"
        />

        {/* START DATE */}
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="p-2 bg-gray-900 border border-gray-700 rounded"
        />

        {/* END DATE */}
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="p-2 bg-gray-900 border border-gray-700 rounded"
        />

        {/* TEAMS */}
        <input
          type="number"
          name="teams"
          placeholder="Total Teams"
          value={form.teams}
          onChange={handleChange}
          className="p-2 bg-gray-900 border border-gray-700 rounded"
        />

        {/* PRIZE POOL */}
        <input
          type="number"
          name="prizePool"
          placeholder="Prize Pool ($)"
          value={form.prizePool}
          onChange={handleChange}
          className="p-2 bg-gray-900 border border-gray-700 rounded"
        />

        {/* STATUS */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 bg-gray-900 border border-gray-700 rounded"
        >
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="finished">Finished</option>
        </select>

        {/* TYPE */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-2 bg-gray-900 border border-gray-700 rounded"
        >
          <option value="international">International</option>
          <option value="national">National</option>
        </select>

        {/* SUBMIT */}
        <button className="bg-purple-600 p-2 rounded hover:bg-purple-700">
          Add Tournament
        </button>

      </form>
    </div>
  );
}