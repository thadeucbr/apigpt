const createUserTool = {
  type: 'function',
  function: {
    name: 'create_user',
    description:
      'Create a new user with validated properties. (all fields must be in english)',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: "User's name (must be a valid name).",
        },
        birthDate: {
          type: 'string',
          format: 'date',
          description:
            "User's birth date (must be a valid date and the user must be over 18 years old).",
        },
        mobile: {
          type: 'string',
          description: "User's mobile number (must be a valid number).",
        },
        password: {
          type: 'string',
          description:
            "User's password is required and must contain at least 6 digits.",
        },
      },
      required: ['name', 'birthDate', 'mobile', 'password'],
      additionalProperties: false,
    },
  },
};

export default createUserTool;
