/**
 * Sudoku puzzle generator module.
 * Provides a high-level function to generate a puzzle board with a unique solution.
 */
import { Board, Difficulty } from '@init-sudoku-post5/contracts';
import { generatePuzzle } from '../services/puzzleGenerator';

/**
 * Generate a Sudoku puzzle for the given difficulty.
 * This is a thin wrapper around the internal puzzleGenerator service.
 */
export const generateSudoku = (difficulty: Difficulty): Board => {
  return generatePuzzle(difficulty);
};
