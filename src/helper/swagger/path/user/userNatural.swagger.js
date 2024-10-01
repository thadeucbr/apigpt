export default {
  '/users/natural': {
    get: {
      summary: 'Fetch All Users via Natural Language',
      description:
        'Retrieves a list of all users by interpreting natural language input with optional filters.',
      tags: ['Natural Language'], // Tag para agrupar na seção Natural Language
      parameters: [
        {
          name: 'input',
          in: 'query',
          required: true,
          description: 'Natural language query to retrieve users',
          schema: {
            type: 'string',
            example: 'Show me all users.',
          },
        },
      ],
      responses: {
        200: {
          description: 'List of users retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  total: {
                    type: 'integer',
                    description: 'Total number of users available',
                  },
                  users: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                        },
                        email: {
                          type: 'string',
                        },
                        birthDate: {
                          type: 'string',
                        },
                        mobile: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/natural': {
    get: {
      summary: 'Fetch Specific User via Natural Language',
      description:
        'Retrieves details of a specific user by interpreting natural language input.',
      tags: ['Natural Language'], // Tag para agrupar na seção Natural Language
      parameters: [
        {
          name: 'input',
          in: 'query',
          required: true,
          description: 'Natural language query to retrieve a specific user',
          schema: {
            type: 'string',
            example: 'Find the user named John Doe.',
          },
        },
      ],
      responses: {
        200: {
          description: 'User details retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  birthDate: {
                    type: 'string',
                  },
                  mobile: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/natural/create': {
    post: {
      summary: 'Create User via Natural Language',
      description: 'Creates a new user by interpreting natural language input.',
      tags: ['Natural Language'], // Tag para agrupar na seção Natural Language
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                input: {
                  type: 'string',
                  example:
                    'I want to create a user named John Doe, with email john.doe@example.com, password securepassword123, birth date 1990-01-01, and mobile +1234567890.',
                },
              },
              required: ['input'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User created successfully',
        },
        400: {
          description: 'Invalid input',
        },
      },
    },
  },
};
