export default {
  '/ai': {
    post: {
      summary: 'Processa a requisição AI',
      description: 'Envia uma requisição para o serviço AI.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                body: {
                  type: 'object',
                },
                header: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Resposta bem-sucedida',
        },
      },
    },
  },
};
