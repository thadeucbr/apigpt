const mongoRepositoryTool = {
  type: 'function',
  function: {
    name: 'mongo_repository',
    description:
      'Perform generic database operations using MongoDB. Specify the collection, operation type, and query parameters.',
    parameters: {
      type: 'object',
      properties: {
        collection: {
          type: 'string',
          description: 'The name of the MongoDB collection to operate on.',
          enum: ['Order', 'Product', 'User'],
        },
        operation: {
          type: 'string',
          description:
            "The type of operation to perform: 'find', 'findOne', 'create', 'update', or 'delete'.",
          enum: ['find', 'findOne', 'create', 'update', 'delete'],
        },
        query: {
          type: 'object',
          description: 'The query parameters used for the operation.',
        },
      },
      required: ['collection', 'operation', 'query'],
      additionalProperties: false,
    },
  },
};

export default mongoRepositoryTool;
