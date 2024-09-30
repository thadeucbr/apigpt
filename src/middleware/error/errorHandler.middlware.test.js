import express from 'express';
import request from 'supertest';
import errorHandler from './errorHandler.middlware.js'; // Ajuste o caminho conforme necessário

describe('errorHandler', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json()); // Middleware para parsear JSON

    // Rota para simular erro
    app.get('/error', (req, res, next) => {
      const error = new Error('Test error');
      next(error); // Passa o erro para o middleware de erro
    });

    app.use(errorHandler); // Usa o middleware de erro
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
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(); // Mocka console.error

    await request(app).get('/error');

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Test error')); // Verifica se o erro foi logado
    consoleErrorSpy.mockRestore(); // Restaura o método original
  });
});
