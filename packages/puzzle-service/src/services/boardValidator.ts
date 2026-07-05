import { Board } from '@init-sudoku-post5/contracts';

/**
 * Validates a Sudoku board according to Sudoku rules.
 * Returns an object with `valid` flag and optional `errors` array of "row,col" strings.
 */
export const validateBoard = (board: Board): { valid: boolean; errors?: string[] } => {
  const errors: string[] = [];

  // Helper to check duplicates in an array of numbers (0 ignored).
  const checkDuplicates = (values: number[], baseIndex: number, isRow: boolean) => {
    const seen = new Set<number>();
    values.forEach((val, idx) => {
      if (val === 0) return;
      if (seen.has(val)) {
        const row = isRow ? baseIndex : idx;
        const col = isRow ? idx : baseIndex;
        errors.push(`${row},${col}`);
      } else {
        seen.add(val);
      }
    });
  };

  // Rows
  board.forEach((row, rIdx) => {
    checkDuplicates(row, rIdx, true);
  });

  // Columns
  for (let c = 0; c < 9; c++) {
    const colVals = board.map(row => row[c]);
    checkDuplicates(colVals, c, false);
  }

  // 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const values: number[] = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          values.push(board[boxRow * 3 + r][boxCol * 3 + c]);
        }
      }
      const baseRow = boxRow * 3;
      const baseCol = boxCol * 3;
      // For each duplicate, we need to report each offending cell. Simpler: just report box top-left.
      const seen = new Set<number>();
      values.forEach((val, idx) => {
        if (val === 0) return;
        if (seen.has(val)) {
          const row = baseRow + Math.floor(idx / 3);
          const col = baseCol + (idx % 3);
          errors.push(`${row},${col}`);
        } else {
          seen.add(val);
        }
      });
    }
  }

  return errors.length ? { valid: false, errors } : { valid: true };
};
