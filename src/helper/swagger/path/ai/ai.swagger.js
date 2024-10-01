export default {
  '/ai': {
    post: {
      summary: 'Interact with AI for API Commands',
      description:
        'This endpoint allows users to send natural language commands to the API. You can use this to perform various actions such as creating users, fetching products, or retrieving information. Here are some examples of how to structure your commands:\n' +
        '- "Create a user named John Doe with email john.doe@example.com."\n' +
        '- "Find all products under $50."\n' +
        '- "Show me details of the user named Jane Smith."\n' +
        '- "List all users."',
      tags: ['AI Command Interface'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                prompt: {
                  type: 'string',
                  example:
                    'Create a product named Sample Product with description "This is a sample product." and price 19.99.',
                },
              },
              required: ['prompt'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Response from the API based on the provided command',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  response: {
                    type: 'string',
                    description:
                      'The result of the command interpreted and executed by the API.',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid command, please check your input.',
        },
      },
    },
  },
};
