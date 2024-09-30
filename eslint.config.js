import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: true, // Adiciona 'process' como uma variável global
      },
    },
    ignores: ['**/*.test.js', '**/*.test.mjs', '**/__tests__/'], // Ignorar arquivos de teste
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }], // Ignorar variáveis que começam com '_'
      'no-undef': 'off', // Desativar a regra 'no-undef'
    },
  },
];
