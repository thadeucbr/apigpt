import express from 'express';
import request from 'supertest';
import errorHandler from './errorHandler.middlware.js';

describe('errorHandler', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());

    app.get('/error', (req, res, next) => {
      const error = new Error('Test error');
      next(error);
    });

    app.use(errorHandler);
  });

  it('should respond with status 500 and error message', async () => {
    const response = await request(app).get('/error');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Something went wrong!',
    });
  });

  it('should log the error stack', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation();

    await request(app).get('/error');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Test error')
    );
    consoleErrorSpy.mockRestore();
  });
});
