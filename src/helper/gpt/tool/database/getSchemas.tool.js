const getSchemasTool = {
  type: 'function',
  function: {
    name: 'get_schemas',
    description:
      'Retrieve available schemas and their properties for database operations.',
    parameters: {
      type: 'object',
      properties: {
        schemas: {
          type: 'array',
          description: 'List of available schemas.',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the schema.',
              },
              description: {
                type: 'string',
                description: 'Description of the schema.',
              },
              model: {
                type: 'string',
                description: 'Name of the corresponding model.',
              },
              properties: {
                type: 'object',
                description: 'Properties of the schema.',
                additionalProperties: {
                  type: 'object',
                  properties: {
                    required: {
                      type: 'boolean',
                      description: 'Indicates if the property is required.',
                    },
                    unique: {
                      type: 'boolean',
                      description: 'Indicates if the property must be unique.',
                    },
                    default: {
                      type: 'string',
                      description: 'Default value for the property.',
                    },
                    type: {
                      type: 'string',
                      description: 'Data type of the property.',
                    },
                    description: {
                      type: 'string',
                      description: 'Description of the property.',
                    },
                    enum: {
                      type: 'array',
                      description: 'Possible values for the property.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      required: [],
      additionalProperties: false,
    },
  },
};

export default getSchemasTool;
