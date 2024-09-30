import express from 'express';
import request from 'supertest';
import gptMiddleware from './gpt.middleware.js'; // Ajuste o caminho conforme necessário
import * as aiService from '../../service/ai/ai.service.js';

vi.mock('../../service/ai/ai.service.js'); // Mockando o aiService

describe('gptMiddleware', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json()); // Middleware para parsear JSON
    app.post('/gpt', gptMiddleware); // Define a rota que usa o middleware
  });

  afterEach(() => {
    vi.clearAllMocks(); // Limpa mocks após cada teste
  });

  it('should respond with the correct status and message', async () => {
    const mockResponse = {
      content: JSON.stringify({
        message: 'Success',
        statusCode: 200,
        status: 'success',
      }),
    };

    aiService.default.mockResolvedValue(mockResponse); // Mockando a resposta do aiService

    const response = await request(app)
      .post('/gpt')
      .send({ input: 'Hello, GPT!' })
      .set('Authorization', 'Bearer token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'success',
      message: 'Success',
    });
    
    expect(aiService.default).toHaveBeenCalledWith(expect.objectContaining({
      body: { input: 'Hello, GPT!' },
      header: expect.objectContaining({
        authorization: 'Bearer token',
      }),
      query: {},
      method: 'POST',
      url: '/gpt',
    }));
  });

  it('should handle errors from aiService', async () => {
    const mockErrorResponse = {
      content: JSON.stringify({
        message: 'Error occurred',
        statusCode: 500,
        status: 'error',
      }),
    };

    aiService.default.mockResolvedValue(mockErrorResponse); // Mockando uma resposta de erro

    const response = await request(app)
      .post('/gpt')
      .send({ input: 'Hello, GPT!' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Error occurred',
    });
  });
});
