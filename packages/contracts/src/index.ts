// Shared contract types for Sudoku platform

/**
 * Represents a single cell in a Sudoku board.
 * `0` denotes an empty cell, while 1‑9 denote filled values.
 */
export type SudokuCell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * A row of a Sudoku board – exactly nine cells.
 */
export type SudokuRow = [
  SudokuCell, SudokuCell, SudokuCell, SudokuCell, SudokuCell,
  SudokuCell, SudokuCell, SudokuCell, SudokuCell
];

/**
 * A complete 9×9 Sudoku board. The type guarantees nine rows each containing nine cells.
 */
export type Board = [
  SudokuRow, SudokuRow, SudokuRow, SudokuRow, SudokuRow,
  SudokuRow, SudokuRow, SudokuRow, SudokuRow
];

/**
 * Difficulty levels supported by the puzzle generator and leaderboard.
 */
export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

/**
 * Core domain entity representing a generated puzzle.
 */
export interface Puzzle {
  board: Board;
  difficulty: Difficulty;
}

/**
 * Core domain entity representing a player's score for a completed puzzle.
 */
export interface Score {
  playerName: string;
  difficulty: Difficulty;
  /** Time to solve in milliseconds */
  timeMs: number;
}

/**
 * Entry returned in a leaderboard response. Extends `Score` with a rank.
 */
export interface LeaderboardEntry extends Score {
  /** 1‑based position in the leaderboard */
  rank: number;
}

/**
 * Request shape for fetching a new puzzle.
 */
export interface PuzzleRequest {
  difficulty: Difficulty;
}

/**
 * Response shape for a puzzle fetch request.
 */
export interface PuzzleResponse {
  board: Board;
  difficulty: Difficulty;
}

/**
 * Request shape for validating a completed board.
 */
export interface ValidateRequest {
  board: Board;
}

/**
 * Response shape for board validation.
 */
export interface ValidateResponse {
  /** True when the board satisfies Sudoku rules */
  valid: boolean;
  /** Optional list of erroneous cell coordinates expressed as "row,col" (0‑based) */
  errors?: string[];
}

/**
 * Request shape for submitting a score.
 */
export interface ScoreRequest {
  playerName: string;
  difficulty: Difficulty;
  /** Time to solve in milliseconds */
  timeMs: number;
}

/**
 * Response shape after posting a score.
 */
export interface ScoreResponse {
  /** Indicates whether the score was accepted */
  success: boolean;
  /** Rank of the submitted score within the leaderboard, if it qualifies */
  rank?: number;
}

/**
 * Request shape for retrieving a leaderboard.
 */
export interface LeaderboardRequest {
  difficulty: Difficulty;
}

/**
 * Response shape containing the top‑10 leaderboard entries for a difficulty.
 */
export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
}
