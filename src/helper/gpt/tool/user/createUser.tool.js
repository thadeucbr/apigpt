const createUserTool = {
  "type": "function",
  "function": {
    "name": "create_user",
    "description": "Create a new user with validated properties.",
    "parameters": {
      "type": "object",
      "properties": {
        "nome": {
          "type": "string",
          "description": "Nome do usuário (deve ser um nome válido)."
        },
        "dataNascimento": {
          "type": "string",
          "format": "date",
          "description": "Data de nascimento do usuário (deve ser uma data válida e o usuário deve ter mais de 18 anos)."
        },
        "celular": {
          "type": "string",
          "description": "Número de celular do usuário (deve ser um número válido)."
        },
        "senha": {
          "type": "string",
          "description": "Senha do usuário (deve conter no mínimo 6 dígitos)."
        }
      },
      "required": ["nome", "dataNascimento", "celular", "senha"],
      "additionalProperties": false
    }
  }
}

export default createUserTool