/**
 * Validation utilities for the web client.
 */

/**
 * Validate a player name.
 * - Must be non‑empty after trimming.
 * - Must contain only alphanumeric characters, spaces, hyphens or underscores.
 */
export function validatePlayerName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { valid: false, error: 'Name cannot be empty' };
  }
  const regex = /^[A-Za-z0-9 _-]+$/;
  if (!regex.test(trimmed)) {
    return { valid: false, error: 'Name contains invalid characters' };
  }
  return { valid: true };
}

/**
 * Simple board validation to ensure all cells contain numbers 0‑9.
 * The server performs full Sudoku validation; this just guards against
 * malformed data before sending.
 */
export function validateBoardValues(board: number[][]): boolean {
  if (!Array.isArray(board) || board.length !== 9) return false;
  for (const row of board) {
    if (!Array.isArray(row) || row.length !== 9) return false;
    for (const cell of row) {
      if (typeof cell !== 'number' || cell < 0 || cell > 9) return false;
    }
  }
  return true;
}
