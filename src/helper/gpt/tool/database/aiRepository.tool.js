const aiRepositoryTool = {
  "type": "function",
  "function": {
    "name": "ai_repository",
    "description": "Perform generic database operations using Mongoose. Specify the model, query, and transaction type.",
    "parameters": {
      "type": "object",
      "properties": {
        "model": {
          "type": "string",
          "description": "The name of the Mongoose model to operate on."
        },
        "query": {
          "type": "object",
          "description": "The query parameters used for the operation. Structure depends on the transaction type.",
          "properties": {
            "filter": {
              "type": "object",
              "description": "Filter criteria for find, findOne, update, and delete operations."
            },
            "update": {
              "type": "object",
              "description": "Data to update (required for update transactions)."
            }
          },
          "required": ["filter"],
          "additionalProperties": true
        },
        "transaction": {
          "type": "string",
          "description": "The type of operation to perform: 'find', 'findOne', 'create', 'update', or 'delete'.",
          "enum": ["find", "findOne", "create", "update", "delete"]
        }
      },
      "required": ["model", "query", "transaction"],
      "additionalProperties": false
    }
  }
}

export default aiRepositoryTool;
