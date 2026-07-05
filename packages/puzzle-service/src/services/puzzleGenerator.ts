import { Board, Difficulty } from '@init-sudoku-post5/contracts';
import { generateSolvedBoard, cloneBoard, hasUniqueSolution } from '../utils/sudoku';
import { config } from '../config';

/**
 * Generates a Sudoku puzzle board with a unique solution.
 * The difficulty determines how many cells are removed.
 */
export const generatePuzzle = (difficulty: Difficulty): Board => {
  const removalCount = config.removalCounts[difficulty] ?? config.removalCounts.easy;
  // Start with a fully solved board.
  const solved = generateSolvedBoard();
  const puzzle = cloneBoard(solved);

  // Create a list of all cell positions.
  const positions: Array<[number, number]> = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push([r, c]);
    }
  }
  // Shuffle positions.
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  let removed = 0;
  for (const [row, col] of positions) {
    if (removed >= removalCount) break;
    const backup = puzzle[row][col];
    puzzle[row][col] = 0 as any;
    // Check if puzzle still has a unique solution.
    if (!hasUniqueSolution(puzzle)) {
      // Revert removal if uniqueness broken.
      puzzle[row][col] = backup;
    } else {
      removed++;
    }
  }

  return puzzle;
};
