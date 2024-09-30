import request from 'supertest';
import express from 'express';
import aiController from './ai.controller.js'; // Ajuste o caminho conforme necessário

const app = express();
app.use(express.json());
app.post('/ai', aiController);

// Mock do aiService
vi.mock('../../service/ai/ai.service.js', () => ({
  default: vi.fn(), // Mock da função padrão
}));

describe('aiController', () => {
  it('deve retornar uma resposta com status 200 e a mensagem correta', async () => {
    // Define o retorno do mock para simular uma resposta bem-sucedida
    const mockResponse = {
      content: JSON.stringify({
        message: 'Sucesso!',
        statusCode: 200,
        status: 'ok'
      })
    };

    // Simula o comportamento do aiService
    const aiService = (await import('../../service/ai/ai.service.js')).default;
    aiService.mockResolvedValue(mockResponse);

    const res = await request(app)
      .post('/ai')
      .send({ /* corpo do request */ }) // Adicione um corpo de request válido aqui
      .set('Authorization', 'Bearer token');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      message: 'Sucesso!'
    });
  });

  it('deve retornar um erro se o serviço falhar', async () => {
    // Define o retorno do mock para simular uma resposta de erro
    const errorResponse = {
      content: JSON.stringify({
        message: 'Erro!',
        statusCode: 500,
        status: 'error'
      })
    };

    // Simula o comportamento do aiService para erro
    const aiService = (await import('../../service/ai/ai.service.js')).default;
    aiService.mockResolvedValue(errorResponse);

    const res = await request(app)
      .post('/ai')
      .send({ /* corpo do request */ }) // Adicione um corpo de request válido aqui
      .set('Authorization', 'Bearer token');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      status: 'error',
      message: 'Erro!'
    });
  });
});
