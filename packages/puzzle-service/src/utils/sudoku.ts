/**
 * Sudoku utility functions: solving, validation, uniqueness checking.
 */
import { Board, SudokuCell } from '@init-sudoku-post5/contracts';

/**
 * Checks whether a board is completely filled (no zeros).
 */
export const isComplete = (board: Board): boolean =>
  board.every(row => row.every(cell => cell !== 0));

/**
 * Returns true if placing `num` at (row, col) does not violate Sudoku rules.
 */
export const canPlace = (board: Board, row: number, col: number, num: SudokuCell): boolean => {
  // Row check
  if (board[row].includes(num)) return false;
  // Column check
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }
  // 3x3 box check
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
};

/**
 * Deep clone a board.
 */
export const cloneBoard = (board: Board): Board => {
  // TypeScript structural typing allows casting after deep copy.
  const newBoard = board.map(row => [...row]) as Board;
  return newBoard;
};

/**
 * Solve the Sudoku board using backtracking. Mutates the board and returns true if solved.
 */
export const solveBoard = (board: Board): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num: SudokuCell = 1 as SudokuCell; num <= 9; num++) {
          if (canPlace(board, row, col, num)) {
            board[row][col] = num;
            if (solveBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false; // no valid number
      }
    }
  }
  return true; // solved
};

/**
 * Count the number of possible solutions for a board, up to a limit.
 * Used to test uniqueness.
 */
export const countSolutions = (board: Board, limit = 2): number => {
  let count = 0;
  const helper = (b: Board): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (b[row][col] === 0) {
          for (let num: SudokuCell = 1 as SudokuCell; num <= 9; num++) {
            if (canPlace(b, row, col, num)) {
              b[row][col] = num;
              if (helper(b)) return true;
              b[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    count++;
    return count >= limit; // stop early if limit reached
  };
  helper(cloneBoard(board));
  return count;
};

/**
 * Returns true if the board has a unique solution.
 */
export const hasUniqueSolution = (board: Board): boolean => {
  const solutions = countSolutions(board, 2);
  return solutions === 1;
};

/**
 * Generates a completely solved Sudoku board.
 */
export const generateSolvedBoard = (): Board => {
  // Start with an empty board and solve it.
  const emptyBoard: Board = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => 0 as SudokuCell)
  ) as Board;
  const solved = solveBoard(emptyBoard);
  if (!solved) throw new Error('Failed to generate solved board');
  return emptyBoard;
};
