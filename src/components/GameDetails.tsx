import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card } from "./ui/card";

interface Props {
  gameId: string;
}

export function GameDetails({ gameId }: Props) {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "games", gameId, "teams")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTeams(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeams();
  }, [gameId]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl mb-6">Teams</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="p-4 text-center">
            <h2>{team.name}</h2>
            <p>{team.playersCount} players</p>
          </Card>
        ))}
      </div>
    </div>
  );
}