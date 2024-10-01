export default {
  '/products/natural': {
    get: {
      summary: 'Fetch All Products via Natural Language',
      description:
        'Retrieves a list of all products by interpreting natural language input with optional filters.',
      tags: ['Natural Language'], // Tag para agrupar na seção Natural Language
      parameters: [
        {
          name: 'prompt',
          in: 'query',
          required: true,
          description: 'Natural language query to retrieve products',
          schema: {
            type: 'string',
            example: 'Show me all products priced between 10 and 50',
          },
        },
      ],
      responses: {
        200: {
          description: 'List of products retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  total: {
                    type: 'integer',
                    description: 'Total number of products available',
                  },
                  products: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: {
                          type: 'string',
                        },
                        description: {
                          type: 'string',
                        },
                        price: {
                          type: 'number',
                        },
                        stock: {
                          type: 'number',
                        },
                        category: {
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
  '/product/natural': {
    get: {
      summary: 'Fetch Specific Product via Natural Language',
      description:
        'Retrieves details of a specific product by interpreting natural language input.',
      tags: ['Natural Language'], // Tag para agrupar na seção Natural Language
      parameters: [
        {
          name: 'prompt',
          in: 'query',
          required: true,
          description: 'Natural language query to retrieve a specific product',
          schema: {
            type: 'string',
            example: 'Find the product named Sample Product.',
          },
        },
      ],
      responses: {
        200: {
          description: 'Product details retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  description: {
                    type: 'string',
                  },
                  price: {
                    type: 'number',
                  },
                  stock: {
                    type: 'number',
                  },
                  category: {
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
  '/product/natural/create': {
    post: {
      summary: 'Create Product via Natural Language',
      description:
        'Creates a new product by interpreting natural language input.',
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
                    'I want to create a product named Sample Product, with description "This is a sample product description.", price 29.99, stock 100, and category Electronics.',
                },
              },
              required: ['input'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Product created successfully',
        },
        400: {
          description: 'Invalid input',
        },
      },
    },
  },
};
