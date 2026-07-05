import request from 'supertest';
import app from '../index';
import { Difficulty } from '@init-sudoku-post5/contracts';

describe('GET /puzzle', () => {
  const difficulties: Difficulty[] = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard];

  difficulties.forEach(diff => {
    it(`should return a puzzle for difficulty ${diff}`, async () => {
      const res = await request(app).get('/puzzle').query({ difficulty: diff });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('board');
      expect(res.body).toHaveProperty('difficulty', diff);
      const board = res.body.board;
      // board should be 9x9 array of numbers 0-9
      expect(Array.isArray(board)).toBe(true);
      expect(board).toHaveLength(9);
      board.forEach((row: any) => {
        expect(Array.isArray(row)).toBe(true);
        expect(row).toHaveLength(9);
        row.forEach((cell: any) => {
          expect(typeof cell).toBe('number');
          expect(cell).toBeGreaterThanOrEqual(0);
          expect(cell).toBeLessThanOrEqual(9);
        });
      });
    });
  });

  it('should reject invalid difficulty', async () => {
    const res = await request(app).get('/puzzle').query({ difficulty: 'invalid' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
