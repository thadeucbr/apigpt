export default {
  '/users/natural': {
    post: {
      summary: 'Fetch All Users via Natural Language',
      description:
        'Retrieves a list of all users by interpreting natural language input.',
      tags: ['Natural Language'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                input: {
                  type: 'string',
                  example: 'Show me all users.',
                },
              },
              required: ['input'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'List of users retrieved successfully',
          content: {
            'application/json': {
              schema: {
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
  '/user/natural': {
    post: {
      summary: 'Fetch Specific User via Natural Language',
      description:
        'Retrieves details of a specific user by interpreting natural language input.',
      tags: ['Natural Language'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                input: {
                  type: 'string',
                  example: 'Find the user named John Doe.',
                },
              },
              required: ['input'],
            },
          },
        },
      },
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
      tags: ['Natural Language'],
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
