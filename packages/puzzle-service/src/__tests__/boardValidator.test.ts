import { validateBoard as boardValidator } from '../services/boardValidator';
import { generateSolvedBoard } from '../utils/sudoku';
import { Board } from '@init-sudoku-post5/contracts';

describe('Board Validator', () => {
  it('accepts a correct solved board', () => {
    const board = generateSolvedBoard();
    const result = boardValidator(board);
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('detects duplicate in a column', () => {
    const board = generateSolvedBoard();
    // duplicate first column values
    board[1][0] = board[0][0];
    const result = boardValidator(board);
    expect(result.valid).toBe(false);
    expect(Array.isArray(result.errors)).toBe(true);
    expect(result.errors!.length).toBeGreaterThan(0);
  });

  it('detects duplicate in a 3x3 box', () => {
    const board = generateSolvedBoard();
    // duplicate in top-left box
    board[0][0] = board[1][1];
    const result = boardValidator(board);
    expect(result.valid).toBe(false);
    expect(Array.isArray(result.errors)).toBe(true);
    expect(result.errors!.length).toBeGreaterThan(0);
  });
});
