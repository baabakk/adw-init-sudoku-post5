import { Router, Request, Response, NextFunction } from 'express';
import { ValidateRequest, ValidateResponse } from '@init-sudoku-post5/contracts';
import { validateBoard as validateBoardInput } from '../utils/validation';
import { validateBoard as boardValidator } from '../services/boardValidator';

const router = Router();

/**
 * POST /validate
 * Accepts a Sudoku board and returns validation result.
 */
router.post(
  '/',
  (req: Request<{}, {}, ValidateRequest>, res: Response<ValidateResponse>, next: NextFunction) => {
    const { board } = req.body;
    if (!validateBoardInput(board)) {
      const err: any = new Error('Invalid board format');
      err.status = 400;
      return next(err);
    }
    try {
      const result = boardValidator(board);
      res.json(result);
    } catch (e) {
      const err: any = e instanceof Error ? e : new Error('Board validation failed');
      err.status = 500;
      next(err);
    }
  }
);

export default router;
