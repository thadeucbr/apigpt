import express from 'express';
import request from 'supertest';
import validateRequest from './validateRequest.middleware.js'; // Ajuste o caminho conforme necessário
import * as aiService from '../../service/ai/ai.service.js';

vi.mock('../../service/ai/ai.service.js'); // Mockando o aiService

describe('validateRequest Middleware', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json()); // Middleware para parsear JSON
    app.post('/test', validateRequest, (req, res) => res.send('OK')); // Define a rota que usa o middleware
  });

  afterEach(() => {
    vi.clearAllMocks(); // Limpa mocks após cada teste
  });

  it('should respond with 200 and a success message for valid requests', async () => {
    const mockResponse = {
      content: JSON.stringify({
        message: 'OK',
        statusCode: 200,
        status: 'OK',
      }),
    };

    aiService.default.mockResolvedValue(mockResponse); // Mockando a resposta do aiService

    const response = await request(app)
      .post('/test')
      .send({ input: 'Valid input' })
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
    
    expect(aiService.default).toHaveBeenCalledWith(expect.objectContaining({
      body: { input: 'Valid input' },
      header: expect.objectContaining({
        authorization: 'Bearer token',
      }),
      query: {},
      method: 'POST',
      url: '/test',
    }));
  });

  it('should respond with an error message for invalid requests', async () => {
    const mockErrorResponse = {
      content: JSON.stringify({
        message: 'Invalid input',
        statusCode: 400,
        status: 'error',
      }),
    };

    aiService.default.mockResolvedValue(mockErrorResponse); // Mockando uma resposta de erro

    const response = await request(app)
      .post('/test')
      .send({ input: '' }) // Simulando um input inválido
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Invalid input',
    });
  });

  it('should respond with an error message for missing fields', async () => {
    const mockErrorResponse = {
      content: JSON.stringify({
        message: 'Missing fields',
        statusCode: 422,
        status: 'error',
      }),
    };

    aiService.default.mockResolvedValue(mockErrorResponse); // Mockando uma resposta de erro

    const response = await request(app)
      .post('/test')
      .send({}) // Simulando uma requisição sem corpo
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Missing fields',
    });
  });
});
