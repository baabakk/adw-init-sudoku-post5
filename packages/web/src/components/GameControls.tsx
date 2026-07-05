import React from 'react';

interface GameControlsProps {
  onNewPuzzle: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  loading?: boolean;
}

/**
 * Simple control panel for the Sudoku game.
 * Provides buttons to fetch a new puzzle and submit the current solution.
 */
const GameControls: React.FC<GameControlsProps> = ({ onNewPuzzle, onSubmit, canSubmit, loading }) => {
  return (
    <div className="flex space-x-4 mt-4">
      <button
        type="button"
        onClick={onNewPuzzle}
        className="px-4 py-2 bg-gray-600 text-white rounded disabled:bg-gray-400"
        disabled={loading}
      >
        New Puzzle
      </button>
      <button
        type="button"
        onClick={onSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        disabled={!canSubmit || loading}
      >
        Submit Solution
      </button>
    </div>
  );
};

export default GameControls;
