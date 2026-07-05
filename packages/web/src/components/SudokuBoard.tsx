import React from 'react';
import type { EditableBoard } from '../types/sudoku';

interface SudokuBoardProps {
  board: EditableBoard;
  /** Called when a cell value changes. */
  onCellChange: (row: number, col: number, value: number) => void;
  /** Cells that are part of the original puzzle (non‑editable). */
  readonlyCells?: Set<string>; // "row,col" keys
}

const SudokuBoard: React.FC<SudokuBoardProps> = ({ board, onCellChange, readonlyCells }) => {
  const handleChange = (row: number, col: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = Number(val);
    if (Number.isNaN(num) || num < 0 || num > 9) return; // ignore invalid
    onCellChange(row, col, num);
  };

  return (
    <div className="grid grid-cols-9 gap-0.5 border border-gray-500">
      {board.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          const key = `${rIdx},${cIdx}`;
          const isReadOnly = readonlyCells?.has(key) ?? false;
          return (
            <input
              key={key}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              className={`w-10 h-10 text-center border ${
                isReadOnly ? 'bg-gray-200' : 'bg-white'
              } focus:outline-none`}
              value={cell === 0 ? '' : cell}
              readOnly={isReadOnly}
              onChange={handleChange(rIdx, cIdx)}
            />
          );
        })
      )}
    </div>
  );
};

export default SudokuBoard;
