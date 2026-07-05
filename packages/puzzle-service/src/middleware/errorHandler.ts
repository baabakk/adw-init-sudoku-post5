import { Request, Response, NextFunction } from 'express';

/**
 * Central error handling middleware.
 * Sends JSON with `error` message and appropriate HTTP status.
 */
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
};
