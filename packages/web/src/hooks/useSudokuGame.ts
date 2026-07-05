import { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty, PuzzleResponse, ValidateResponse } from '@init-sudoku-post5/contracts';
import { fetchPuzzle, validateBoard } from '../services/puzzleService';
import type { SudokuGameState } from '../types/sudoku';

/**
 * Custom hook that encapsulates the Sudoku game lifecycle:
 * - fetching a puzzle of a selected difficulty
 * - tracking elapsed time
 * - handling cell edits
 * - submitting the board for validation
 */
export function useSudokuGame(initialDifficulty: Difficulty = Difficulty.Easy) {
  const [state, setState] = useState<SudokuGameState>(() => ({
    board: [] as any,
    difficulty: initialDifficulty,
    elapsedMs: 0,
  }));

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start / stop timer based on board existence (ignore initial empty array)
  useEffect(() => {
    // Cast to any to avoid literal length type issue (Board length is 9)
    const boardLength = (state.board as any).length as number;
    if (!boardLength) return;
    timerRef.current = setInterval(() => {
      setState((prev) => ({ ...prev, elapsedMs: prev.elapsedMs + 1000 }));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.board]);

  const loadPuzzle = useCallback(async (difficulty: Difficulty) => {
    const puzzle: PuzzleResponse = await fetchPuzzle(difficulty);
    setState({
      board: puzzle.board,
      difficulty: puzzle.difficulty,
      elapsedMs: 0,
      validated: false,
    });
  }, []);

  const updateCell = useCallback((row: number, col: number, value: number) => {
    setState((prev) => {
      const newBoard = prev.board.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? (value as any) : c))
      ) as any;
      return { ...prev, board: newBoard };
    });
  }, []);

  const submitValidation = useCallback(async () => {
    const result: ValidateResponse = await validateBoard(state.board);
    setState((prev) => ({ ...prev, validated: true, validationResult: result }));
    // stop timer
    if (timerRef.current) clearInterval(timerRef.current);
    return result;
  }, [state.board]);

  // Load initial puzzle on mount
  useEffect(() => {
    loadPuzzle(initialDifficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state,
    loadPuzzle,
    updateCell,
    submitValidation,
  };
}
