import { generatePuzzle } from '../services/puzzleGenerator';
import { Difficulty } from '@init-sudoku-post5/contracts';
import { generateSolvedBoard, hasUniqueSolution } from '../utils/sudoku';
import { config } from '../config';

describe('Puzzle Generator', () => {
  it('generates a puzzle with correct difficulty removal count', () => {
    const difficulty: Difficulty = Difficulty.Easy;
    const puzzle = generatePuzzle(difficulty);
    const removalTarget = config.removalCounts[difficulty];
    const emptyCells = puzzle.flat().filter(cell => cell === 0).length;
    expect(emptyCells).toBeGreaterThanOrEqual(removalTarget - 2); // allow small variance due to uniqueness constraints
    expect(emptyCells).toBeLessThanOrEqual(removalTarget + 2);
  });

  it('produces a puzzle with a unique solution', () => {
    const puzzle = generatePuzzle(Difficulty.Medium);
    const unique = hasUniqueSolution(puzzle);
    expect(unique).toBe(true);
  });

  it('returns a board of correct dimensions', () => {
    const puzzle = generatePuzzle(Difficulty.Hard);
    expect(puzzle).toHaveLength(9);
    puzzle.forEach(row => {
      expect(row).toHaveLength(9);
    });
  });
});
