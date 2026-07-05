/**
 * Configuration for the puzzle service.
 */
export const config = {
  /** Port the HTTP server listens on */
  port: Number(process.env.PORT) || 3000,
  /** Number of cells to remove for each difficulty level */
  removalCounts: {
    easy: 30,
    medium: 40,
    hard: 50,
  } as Record<string, number>,
  /** Rate limit options */
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
};
