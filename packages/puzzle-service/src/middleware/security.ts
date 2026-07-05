import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

/**
 * Security middleware stack.
 * Applies Helmet for HTTP headers, CORS (allow all origins for simplicity), and rate limiting.
 */
export const securityMiddleware = [
  helmet(),
  cors(),
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    handler: (_req: Request, _res: Response, next: NextFunction) => {
      const err = new Error('Too many requests, please try again later');
      (err as any).status = 429;
      next(err);
    },
  }),
];
