import axios from 'axios';
import type {
  PuzzleRequest,
  PuzzleResponse,
  ValidateRequest,
  ValidateResponse,
  Difficulty,
} from '@init-sudoku-post5/contracts';

// Base URL for the Puzzle Service – in a real app this would be configurable via environment variables.
// For simplicity and to avoid TypeScript errors with import.meta in CommonJS builds, we default to an empty string.
const BASE_URL = process.env.VITE_PUZZLE_SERVICE_URL || '';

/** Fetch a new puzzle of the given difficulty. */
export async function fetchPuzzle(difficulty: Difficulty): Promise<PuzzleResponse> {
  const params = { difficulty } as const;
  const response = await axios.get<PuzzleResponse>(`${BASE_URL}/puzzle`, { params });
  return response.data;
}

/** Submit a completed board for validation. */
export async function validateBoard(board: PuzzleResponse['board']): Promise<ValidateResponse> {
  const payload: ValidateRequest = { board };
  const response = await axios.post<ValidateResponse>(`${BASE_URL}/validate`, payload);
  return response.data;
}
