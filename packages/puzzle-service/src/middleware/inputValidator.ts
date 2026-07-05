import { Request, Response, NextFunction } from 'express';
import { validateDifficulty, validateBoard } from '../utils/validation';
import { Difficulty, ValidateRequest } from '@init-sudoku-post5/contracts';

/**
 * Middleware to validate query parameters for GET /puzzle and body for POST /validate.
 * Calls next(err) with status 400 on validation failure.
 */
export const inputValidator = {
  puzzle: (req: Request, _res: Response, next: NextFunction) => {
    const { difficulty } = req.query as Partial<{ difficulty: unknown }>;
    if (!validateDifficulty(difficulty)) {
      const err: any = new Error('Invalid difficulty parameter');
      err.status = 400;
      return next(err);
    }
    return next();
  },
  validate: (req: Request<{}, {}, ValidateRequest>, _res: Response, next: NextFunction) => {
    const { board } = req.body;
    if (!validateBoard(board)) {
      const err: any = new Error('Invalid board format');
      err.status = 400;
      return next(err);
    }
    return next();
  },
};
