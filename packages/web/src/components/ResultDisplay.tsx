import React from 'react';
import type { ValidateResponse } from '@init-sudoku-post5/contracts';

interface ResultDisplayProps {
  /** Validation result returned from the server */
  result?: ValidateResponse;
  /** Optional error message for network or client‑side errors */
  errorMessage?: string;
}

/**
 * Displays the outcome of a board validation request.
 * Shows a success message when the board is valid, otherwise lists errors.
 */
const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, errorMessage }) => {
  if (errorMessage) {
    return <p className="text-red-600">{errorMessage}</p>;
  }
  if (!result) return null;

  if (result.valid) {
    return <p className="text-green-600">✅ Puzzle solved correctly!</p>;
  }

  return (
    <div className="text-red-600">
      <p>❌ Puzzle is incorrect.</p>
      {result.errors && result.errors.length > 0 && (
        <ul className="list-disc list-inside mt-2">
          {result.errors.map((cell) => (
            <li key={cell}>Error at cell {cell}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultDisplay;
