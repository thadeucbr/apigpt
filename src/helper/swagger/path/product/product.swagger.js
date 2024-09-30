export default {
  '/products': {
    get: {
      summary: 'Fetch All Products',
      description:
        'Retrieves a list of all products with optional filtering and pagination.',
      tags: ['JSON'], // Tag para agrupar na seção JSON
      parameters: [
        {
          name: 'priceMin',
          in: 'query',
          description: 'Minimum price to filter products',
          required: false,
          schema: {
            type: 'number',
          },
        },
        {
          name: 'priceMax',
          in: 'query',
          description: 'Maximum price to filter products',
          required: false,
          schema: {
            type: 'number',
          },
        },
        {
          name: 'page',
          in: 'query',
          description: 'Page number for pagination',
          required: false,
          schema: {
            type: 'integer',
            example: 1,
          },
        },
        {
          name: 'limit',
          in: 'query',
          description: 'Number of products per page',
          required: false,
          schema: {
            type: 'integer',
            example: 10,
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
  '/product/name/{name}': {
    get: {
      summary: 'Fetch Specific Product by Name',
      description: 'Retrieves details of a specific product by its name.',
      tags: ['JSON'], // Tag para agrupar na seção JSON
      parameters: [
        {
          name: 'name',
          in: 'path',
          required: true,
          description: 'Name of the product to retrieve',
          schema: {
            type: 'string',
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
  '/product': {
    post: {
      summary: 'Create Product',
      description:
        'Creates a new product by sending product details in JSON format.',
      tags: ['JSON'], // Tag para agrupar na seção JSON
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Sample Product',
                },
                description: {
                  type: 'string',
                  example: 'This is a sample product description.',
                },
                price: {
                  type: 'number',
                  example: 29.99,
                },
                stock: {
                  type: 'number',
                  example: 100,
                },
                category: {
                  type: 'string',
                  example: 'Electronics',
                },
              },
              required: ['name', 'description', 'price', 'category'],
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
