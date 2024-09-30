import aiService from './ai.service.js'; // Ajuste o caminho conforme necessário
import gpt from '../../helper/gpt/config/gpt.config.js';
import functions from '../../service/index.js';

vi.mock('../../helper/gpt/config/gpt.config.js'); // Mocka a função gpt
vi.mock('../../service/index.js'); // Mocka as funções do serviço

describe('aiService', () => {
  const mockBody = { input: 'Hello' };
  const mockHeader = { authorization: 'Bearer token' };
  const mockQuery = {};
  const mockMethod = 'POST';
  const mockUrl = '/api/test';

  beforeEach(() => {
    vi.clearAllMocks(); // Limpa mocks antes de cada teste
  });

  it('should call the appropriate function and return a response after retries', async () => {
    const mockGptResponse1 = {
      content: null,
      tool_calls: [
        {
          id: '1',
          function: {
            name: 'mockFunction',
            arguments: JSON.stringify({ param1: 'value1' }),
          },
        },
      ],
    };

    const mockGptResponse2 = {
      content: 'Some content',
      tool_calls: [],
    };

    gpt.mockResolvedValueOnce(mockGptResponse1); // Primeira chamada ao gpt
    gpt.mockResolvedValueOnce(mockGptResponse2); // Segunda chamada ao gpt

    functions['mockFunction'] = vi.fn().mockResolvedValue({ message: 'Success', statusCode: 200, status: 'success' });

    const response = await aiService({ body: mockBody, header: mockHeader, query: mockQuery, method: mockMethod, url: mockUrl });

    expect(gpt).toHaveBeenCalledTimes(2); // Verifica que gpt foi chamado duas vezes
    expect(functions['mockFunction']).toHaveBeenCalledWith({ param1: 'value1' }); // Verifica se a função correta foi chamada
    expect(response).toEqual(mockGptResponse2); // A última resposta deve ser a retornada
  });

  it('should return an error if the function does not exist', async () => {
    const mockGptResponse = {
      content: null,
      tool_calls: [
        {
          id: '1',
          function: {
            name: 'nonExistentFunction',
            arguments: JSON.stringify({ param1: 'value1' }),
          },
        },
      ],
    };
    gpt.mockResolvedValue(mockGptResponse);

    const response = await aiService({ body: mockBody, header: mockHeader, query: mockQuery, method: mockMethod, url: mockUrl });

    expect(response).toEqual({ message: 'Function not found', statusCode: 404, status: 'error' });
  });

  it('should handle errors from gpt', async () => {
    const errorMessage = 'GPT error';
    gpt.mockRejectedValue(new Error(errorMessage)); // Simula um erro na chamada do gpt

    const response = await aiService({ body: mockBody, header: mockHeader, query: mockQuery, method: mockMethod, url: mockUrl });

    expect(response).toBe(errorMessage); // Verifica se a mensagem de erro foi retornada
  });
});
