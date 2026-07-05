import axios from 'axios';
import type { ScoreRequest, ScoreResponse, LeaderboardRequest, LeaderboardResponse, Difficulty } from '@init-sudoku-post5/contracts';

const BASE_URL = import.meta.env.VITE_SCORES_SERVICE_URL || '';

/** Submit a player's score after solving a puzzle. */
export async function postScore(request: ScoreRequest): Promise<ScoreResponse> {
  const response = await axios.post<ScoreResponse>(`${BASE_URL}/scores`, request);
  return response.data;
}

/** Retrieve the leaderboard for a specific difficulty. */
export async function fetchLeaderboard(difficulty: Difficulty): Promise<LeaderboardResponse> {
  const params = { difficulty } as const;
  const response = await axios.get<LeaderboardResponse>(`${BASE_URL}/leaderboard`, { params });
  return response.data;
}
