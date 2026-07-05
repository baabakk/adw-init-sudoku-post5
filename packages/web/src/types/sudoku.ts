import { Board, Difficulty } from '@init-sudoku-post5/contracts';

/**
 * Extends the raw Board with a mutable representation for UI editing.
 * Each cell can be a number 0‑9 where 0 denotes empty.
 */
export type EditableBoard = Board;

/**
 * Game state managed by the UI.
 */
export interface SudokuGameState {
  board: EditableBoard;
  difficulty: Difficulty;
  /** Milliseconds elapsed since puzzle start */
  elapsedMs: number;
  /** Whether the current board has been validated */
  validated?: boolean;
  /** Validation result if validated */
  validationResult?: {
    valid: boolean;
    errors?: string[];
  };
}
