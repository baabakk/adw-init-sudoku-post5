/**
 * Input validation utilities for the puzzle service.
 */
import { Board, Difficulty } from '@init-sudoku-post5/contracts';

/**
 * Validates that the provided difficulty string is a valid Difficulty enum value.
 */
export const validateDifficulty = (value: any): value is Difficulty => {
  return typeof value === 'string' && Object.values(Difficulty).includes(value as Difficulty);
};

/**
 * Validates that the provided board matches the Board type: 9x9 array of numbers 0-9.
 * Returns true if valid, false otherwise.
 */
export const validateBoard = (board: any): board is Board => {
  if (!Array.isArray(board) || board.length !== 9) return false;
  for (const row of board) {
    if (!Array.isArray(row) || row.length !== 9) return false;
    for (const cell of row) {
      if (typeof cell !== 'number' || cell < 0 || cell > 9 || !Number.isInteger(cell)) {
        return false;
      }
    }
  }
  return true;
};
