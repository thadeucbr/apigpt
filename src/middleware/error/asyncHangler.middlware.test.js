import express from 'express';
import request from 'supertest';
import asyncHandler from './asyncHandler.middlware.js'; // Ajuste o caminho conforme necessário

describe('asyncHandler', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json()); // Middleware para parsear JSON
  });

  it('should call the handler and return the response', async () => {
    const mockHandler = asyncHandler(async (req, res) => {
      res.status(200).json({ message: 'Success' });
    });

    app.get('/test', mockHandler);

    const response = await request(app).get('/test');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Success' });
  });

  it('should catch errors and pass them to next()', async () => {
    const mockError = new Error('Test error');
    const mockHandler = asyncHandler(async () => {
      throw mockError; // Simula um erro
    });

    app.get('/error', mockHandler);

    const response = await request(app).get('/error');

    // O status padrão para um erro não tratado é 500
    expect(response.status).toBe(500);
    expect(response.text).toContain('Test error'); // Verifica se a mensagem de erro está presente
  });
});
