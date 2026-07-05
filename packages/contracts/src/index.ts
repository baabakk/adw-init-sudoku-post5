/**
 * Shared contract types for the Sudoku platform.
 * All services and the web client import these types to ensure a single source of truth.
 * The file is compiled with `strict` enabled.
 */

/** Difficulty levels supported by the platform */
export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

/** A single Sudoku cell value. `null` represents an empty cell. */
export type Cell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

/** A 9×9 Sudoku board. The outer array is rows, the inner array is columns. */
export type Board = Cell[][];

/** Represents a generated puzzle. It is essentially a board with some cells empty. */
export interface Puzzle {
  /** The board layout for the puzzle. */
  board: Board;
  /** Difficulty of the puzzle. */
  difficulty: Difficulty;
}

/** Result of validating a completed board. */
export enum ValidationStatus {
  Valid = "valid",
  Invalid = "invalid",
  Incomplete = "incomplete",
}

/** Validation response payload. */
export interface ValidateResponse {
  /** Overall validation status. */
  status: ValidationStatus;
  /** Optional human‑readable messages describing validation errors. Present when status is Invalid. */
  errors?: string[];
}

/** Score entry stored by the Scores service. */
export interface Score {
  /** Player's display name. */
  playerName: string;
  /** Difficulty of the puzzle that was solved. */
  difficulty: Difficulty;
  /** Time taken to solve the puzzle, in milliseconds. */
  timeMs: number;
  /** When the score was recorded (ISO‑8601 string). */
  recordedAt: string;
}

/** A single entry in the leaderboard response. */
export interface LeaderboardEntry extends Score {
  /** Rank of the entry (1‑based). */
  rank: number;
}

/** Request payload for fetching a puzzle. Used as query parameters. */
export interface PuzzleRequest {
  difficulty: Difficulty;
}

/** Response payload for fetching a puzzle. */
export interface PuzzleResponse {
  /** The generated puzzle board. */
  board: Board;
  /** Difficulty of the returned puzzle. */
  difficulty: Difficulty;
}

/** Request payload for validating a board. */
export interface ValidateRequest {
  /** The board to validate. */
  board: Board;
}

/** Request payload for posting a completed game score. */
export interface ScoreRequest {
  playerName: string;
  difficulty: Difficulty;
  timeMs: number;
}

/** Response payload after posting a score. */
export interface ScoreResponse {
  /** Indicates whether the score was accepted. */
  success: boolean;
  /** Optional message providing additional information. */
  message?: string;
}

/** Request payload for fetching the leaderboard. Used as query parameters. */
export interface LeaderboardRequest {
  difficulty: Difficulty;
}

/** Response payload containing the top‑10 leaderboard entries for a difficulty. */
export interface LeaderboardResponse {
  /** Ordered list of leaderboard entries (best time first). */
  entries: LeaderboardEntry[];
}
