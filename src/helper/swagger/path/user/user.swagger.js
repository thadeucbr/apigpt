export default {
  '/users': {
    get: {
      summary: 'Fetch All Users',
      description: 'Retrieves a list of all users.',
      tags: ['JSON'],
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
  '/user/name/{name}': {
    get: {
      summary: 'Fetch Specific User by Name',
      description: 'Retrieves details of a specific user by their name.',
      tags: ['JSON'],
      parameters: [
        {
          name: 'name',
          in: 'path',
          required: true,
          description: 'Name of the user to retrieve',
          schema: {
            type: 'string',
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
  '/user': {
    post: {
      summary: 'Create User',
      description: 'Creates a new user by sending user details in JSON format.',
      tags: ['JSON'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'John Doe',
                },
                email: {
                  type: 'string',
                  example: 'john.doe@example.com',
                },
                password: {
                  type: 'string',
                  example: 'securepassword123',
                },
                birthDate: {
                  type: 'string',
                  example: '1990-01-01',
                },
                mobile: {
                  type: 'string',
                  example: '+1234567890',
                },
              },
              required: ['name', 'email', 'password', 'birthDate', 'mobile'],
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
