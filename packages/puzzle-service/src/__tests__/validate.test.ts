import request from 'supertest';
import app from '../index';
import { ValidateRequest } from '@init-sudoku-post5/contracts';
import { generateSolvedBoard } from '../utils/sudoku';

describe('POST /validate', () => {
  it('should validate a correct solved board', async () => {
    const board = generateSolvedBoard();
    const payload: ValidateRequest = { board };
    const res = await request(app).post('/validate').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('valid', true);
    expect(res.body.errors).toBeUndefined();
  });

  it('should detect an invalid board with duplicate in a row', async () => {
    const board = generateSolvedBoard();
    // Introduce duplicate in first row
    board[0][1] = board[0][0];
    const payload: ValidateRequest = { board };
    const res = await request(app).post('/validate').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('valid', false);
    expect(Array.isArray(res.body.errors)).toBe(true);
    // At least one error coordinate should be reported
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  it('should reject malformed board payload', async () => {
    const payload = { board: [[1, 2]] }; // invalid shape
    const res = await request(app).post('/validate').send(payload);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
