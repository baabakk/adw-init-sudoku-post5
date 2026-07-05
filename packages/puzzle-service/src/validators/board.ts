import { Board } from '@init-sudoku-post5/contracts';
import { validateBoard as internalValidate } from '../services/boardValidator';

/**
 * Public validator for a Sudoku board. Delegates to the internal boardValidator service.
 */
export const validateBoard = (board: Board) => {
  return internalValidate(board);
};
