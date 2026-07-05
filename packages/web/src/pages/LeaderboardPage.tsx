import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Difficulty } from '@init-sudoku-post5/contracts';
import Leaderboard from '../components/Leaderboard';
import DifficultySelector from '../components/DifficultySelector';

const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = React.useState<Difficulty>(Difficulty.Easy);

  const handleDifficultyChange = (d: Difficulty) => {
    setDifficulty(d);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <DifficultySelector selected={difficulty} onSelect={handleDifficultyChange} />
      <Leaderboard difficulty={difficulty} />
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
      >
        Back to Game
      </button>
    </div>
  );
};

export default LeaderboardPage;
