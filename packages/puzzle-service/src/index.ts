import express, { Request, Response, NextFunction } from 'express';
import { config } from './config';
import puzzleRouter from './routes/puzzle';
import validateRouter from './routes/validate';
import { errorHandler } from './middleware/errorHandler';
import { securityMiddleware } from './middleware/security';

const app = express();

// Middleware
app.use(express.json());
app.use(securityMiddleware);

// Routes
app.use('/puzzle', puzzleRouter);
app.use('/validate', validateRouter);

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Error handling (must be after routes)
app.use(errorHandler);

// Start server if this file is executed directly
if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`Puzzle service listening on port ${config.port}`);
  });
}

export default app;
