const getSchemasTool = {
  "type": "function",
  "function": {
    "name": "get_schemas",
    "description": "Retrieve available schemas and their properties for database operations.",
    "parameters": {
      "type": "object",
      "properties": {
        "schemas": {
          "type": "array",
          "description": "List of available schemas.",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "description": "Name of the schema."
              },
              "description": {
                "type": "string",
                "description": "Description of the schema."
              },
              "properties": {
                "type": "object",
                "description": "Properties of the schema.",
                "additionalProperties": {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "description": "Data type of the property."
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the property."
                    },
                    "required": {
                      "type": "boolean",
                      "description": "Indicates if the property is required."
                    }
                  }
                }
              }
            }
          }
        }
      },
      "required": [],
      "additionalProperties": false
    }
  }
}

export default getSchemasTool;
