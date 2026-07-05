import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Difficulty } from '@init-sudoku-post5/contracts';
import { useSudokuGame } from '../hooks/useSudokuGame';
import DifficultySelector from '../components/DifficultySelector';
import SudokuBoard from '../components/SudokuBoard';
import PlayerNameInput from '../components/PlayerNameInput';
import { postScore } from '../services/scoresService';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, loadPuzzle, updateCell, submitValidation } = useSudokuGame();
  const [playerName, setPlayerName] = useState('');

  const handleDifficultyChange = useCallback(
    (d: Difficulty) => {
      loadPuzzle(d);
    },
    [loadPuzzle]
  );

  const handleCellChange = useCallback(
    (row: number, col: number, value: number) => {
      updateCell(row, col, value);
    },
    [updateCell]
  );

  const handleSubmit = async () => {
    const result = await submitValidation();
    if (result.valid && playerName) {
      // Submit score if board is valid
      await postScore({
        playerName,
        difficulty: state.difficulty,
        timeMs: state.elapsedMs,
      });
      navigate('/leaderboard');
    }
  };

  // Determine which cells are read‑only (original clues)
  const readonlyCells = new Set<string>();
  state.board.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      if (cell !== 0) readonlyCells.add(`${rIdx},${cIdx}`);
    });
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sudoku</h1>
      <DifficultySelector selected={state.difficulty} onSelect={handleDifficultyChange} />
      <SudokuBoard board={state.board} onCellChange={handleCellChange} readonlyCells={readonlyCells} />
      <PlayerNameInput onValidName={setPlayerName} />
      <button
        onClick={handleSubmit}
        disabled={state.validated && !state.validationResult?.valid}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        Submit Solution
      </button>
      {state.validated && (
        <div className="mt-4">
          {state.validationResult?.valid ? (
            <p className="text-green-600">Correct! Your time: {(state.elapsedMs / 1000).toFixed(2)} s</p>
          ) : (
            <p className="text-red-600">Incorrect solution.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GamePage;
