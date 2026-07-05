import { Router, Request, Response, NextFunction } from 'express';
import { generatePuzzle } from '../services/puzzleGenerator';
import { PuzzleResponse, PuzzleRequest, Difficulty } from '@init-sudoku-post5/contracts';
import { validateDifficulty } from '../utils/validation';

const router = Router();

/**
 * GET /puzzle?difficulty=easy|medium|hard
 * Returns a generated Sudoku puzzle.
 */
router.get(
  '/',
  (req: Request, res: Response<PuzzleResponse>, next: NextFunction) => {
    const { difficulty } = req.query as Partial<PuzzleRequest>;
    if (!validateDifficulty(difficulty)) {
      const err: any = new Error('Invalid difficulty parameter');
      err.status = 400;
      return next(err);
    }
    try {
      // At this point, difficulty is a valid Difficulty enum value.
      const diff = difficulty as Difficulty;
      const board = generatePuzzle(diff);
      res.json({ board, difficulty: diff });
    } catch (e) {
      const err: any = e instanceof Error ? e : new Error('Puzzle generation failed');
      err.status = 500;
      next(err);
    }
  }
);

export default router;
