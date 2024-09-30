import request from 'supertest';
import express from 'express';
import aiController from './ai.controller.js';

const app = express();
app.use(express.json());
app.post('/ai', aiController);

vi.mock('../../service/ai/ai.service.js', () => ({
  default: vi.fn(),
}));

describe('aiController', () => {
  it('deve retornar uma resposta com status 200 e a mensagem correta', async () => {
    const mockResponse = {
      content: JSON.stringify({
        message: 'Sucesso!',
        statusCode: 200,
        status: 'ok',
      }),
    };

    const aiService = (await import('../../service/ai/ai.service.js')).default;
    aiService.mockResolvedValue(mockResponse);

    const res = await request(app)
      .post('/ai')
      .send({})
      .set('Authorization', 'Bearer token');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      message: 'Sucesso!',
    });
  });

  it('deve retornar um erro se o serviço falhar', async () => {
    const errorResponse = {
      content: JSON.stringify({
        message: 'Erro!',
        statusCode: 500,
        status: 'error',
      }),
    };

    const aiService = (await import('../../service/ai/ai.service.js')).default;
    aiService.mockResolvedValue(errorResponse);

    const res = await request(app)
      .post('/ai')
      .send({})
      .set('Authorization', 'Bearer token');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      status: 'error',
      message: 'Erro!',
    });
  });
});
