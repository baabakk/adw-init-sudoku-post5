/**
 * Service layer validation utilities.
 * These functions are used by the UI before sending data to the backend.
 */
import { validatePlayerName as validateName, validateBoardValues as validateValues } from '../utils/validation';

/** Validate a player name. Returns an object with `valid` flag and optional `error` message. */
export function validatePlayerName(name: string): { valid: boolean; error?: string } {
  return validateName(name);
}

/** Validate that a Sudoku board contains only numbers 0‑9 and has correct dimensions. */
export function validateBoardValues(board: number[][]): boolean {
  return validateValues(board);
}
