import { generateSolvedBoard, hasUniqueSolution, isComplete, solveBoard } from '../utils/sudoku';
import { Board } from '@init-sudoku-post5/contracts';

describe('Sudoku Utilities', () => {
  it('generateSolvedBoard returns a complete valid board', () => {
    const board = generateSolvedBoard();
    // Board should be complete (no zeros)
    expect(isComplete(board)).toBe(true);
    // Each row should contain numbers 1-9 exactly once
    board.forEach(row => {
      const sorted = [...row].sort();
      expect(sorted).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    // Each column should contain numbers 1-9 exactly once
    for (let col = 0; col < 9; col++) {
      const column = board.map(row => row[col]).sort();
      expect(column).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
  });

  it('hasUniqueSolution returns true for a solved board', () => {
    const board = generateSolvedBoard();
    expect(hasUniqueSolution(board)).toBe(true);
  });

  it('solveBoard can solve an incomplete board', () => {
    const board = generateSolvedBoard();
    // Remove a few cells
    const puzzle: Board = board.map(row => row.slice()) as Board;
    puzzle[0][0] = 0;
    puzzle[1][1] = 0;
    const solved = solveBoard(puzzle);
    expect(solved).toBe(true);
    expect(isComplete(puzzle)).toBe(true);
  });
});
