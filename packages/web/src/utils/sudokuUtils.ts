/**
 * Utility functions for Sudoku board manipulation.
 * These helpers are used by the UI and can also be reused by tests.
 */
import type { Board } from '@init-sudoku-post5/contracts';

/**
 * Deep clone a Sudoku board.
 */
export function cloneBoard(board: Board): Board {
  // Since the board is a tuple of tuples, a simple map works.
  return board.map((row) => row.slice()) as Board;
}

/**
 * Check if the board is completely filled (no zeros).
 */
export function isBoardComplete(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell !== 0));
}

/**
 * Convert a board to a printable string (for debugging).
 */
export function boardToString(board: Board): string {
  return board.map((row) => row.join(' ')).join('\n');
}
