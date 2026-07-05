import express from "express";
import { Request, Response, NextFunction } from "express";
import Database from "better-sqlite3";
import {
  Difficulty,
  ScoreRequest,
  ScoreResponse,
  LeaderboardResponse,
  LeaderboardEntry,
} from "@init-sudoku-post5/contracts";

// Initialize SQLite database (file based). In a real deployment the path could be configurable.
const db = new Database("scores.db");
// Ensure the scores table exists.
db.exec(`
  CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    playerName TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    timeMs INTEGER NOT NULL
  );
`);

const app = express();
app.use(express.json());

/** Middleware to validate Difficulty query param */
function parseDifficulty(req: Request, res: Response, next: NextFunction) {
  const diff = req.query.difficulty as string | undefined;
  if (!diff) {
    return res.status(400).json({ error: "Missing difficulty query parameter" });
  }
  if (!Object.values(Difficulty).includes(diff as Difficulty)) {
    return res
      .status(400)
      .json({ error: `Invalid difficulty '${diff}'. Expected one of ${Object.values(Difficulty).join(", ")}` });
  }
  // Attach typed difficulty to request for later handlers.
  (req as any).difficulty = diff as Difficulty;
  next();
}

/** POST /scores – submit a player's score */
app.post("/scores", (req: Request, res: Response) => {
  const body = req.body as Partial<ScoreRequest>;
  // Basic validation against the contract shape.
  if (
    typeof body.playerName !== "string" ||
    typeof body.difficulty !== "string" ||
    typeof body.timeMs !== "number"
  ) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  if (!Object.values(Difficulty).includes(body.difficulty as Difficulty)) {
    return res.status(400).json({ error: "Invalid difficulty value" });
  }

  const stmt = db.prepare(
    "INSERT INTO scores (playerName, difficulty, timeMs) VALUES (?, ?, ?)"
  );
  stmt.run(body.playerName, body.difficulty, body.timeMs);

  // Compute rank: number of scores with same difficulty and timeMs <= submitted time.
  const rankStmt = db.prepare(
    "SELECT COUNT(*) as cnt FROM scores WHERE difficulty = ? AND timeMs <= ?"
  );
  const { cnt } = rankStmt.get(body.difficulty, body.timeMs) as { cnt: number };
  const rank = cnt; // 1‑based rank

  const success = rank <= 10;
  const response: ScoreResponse = { success };
  if (success) {
    response.rank = rank;
  }
  return res.json(response);
});

/** GET /leaderboard – retrieve top‑10 scores for a difficulty */
app.get("/leaderboard", parseDifficulty, (req: Request, res: Response) => {
  const difficulty: Difficulty = (req as any).difficulty;

  const rows = db
    .prepare(
      "SELECT playerName, difficulty, timeMs FROM scores WHERE difficulty = ? ORDER BY timeMs ASC LIMIT 10"
    )
    .all(difficulty) as Array<{ playerName: string; difficulty: string; timeMs: number }>;

  const entries: LeaderboardEntry[] = rows.map((row, idx) => ({
    playerName: row.playerName,
    difficulty: row.difficulty as Difficulty,
    timeMs: row.timeMs,
    rank: idx + 1,
  }));

  const response: LeaderboardResponse = { entries };
  return res.json(response);
});

// Start the HTTP server.
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(PORT, () => {
  console.log(`Scores service listening on port ${PORT}`);
});

export default app;
