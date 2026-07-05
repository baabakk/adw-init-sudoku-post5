import React, { useEffect, useState } from 'react';
import type { LeaderboardEntry, Difficulty } from '@init-sudoku-post5/contracts';
import { fetchLeaderboard } from '../services/scoresService';

interface LeaderboardProps {
  difficulty: Difficulty;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ difficulty }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchLeaderboard(difficulty)
      .then((res) => {
        if (!cancelled) {
          setEntries(res.entries);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? 'Failed to load leaderboard');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [difficulty]);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Top 10 - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1">Rank</th>
            <th className="px-2 py-1">Player</th>
            <th className="px-2 py-1">Time (s)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.rank} className="border-t">
              <td className="px-2 py-1 text-center">{e.rank}</td>
              <td className="px-2 py-1">{e.playerName}</td>
              <td className="px-2 py-1 text-center">{(e.timeMs / 1000).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
