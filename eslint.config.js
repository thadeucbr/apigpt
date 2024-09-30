import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: true,
      },
    },
    ignores: ['**/*.test.js', '**/*.test.mjs', '**/__tests__/'],
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
      'no-undef': 'off',
      'no-warning-comments': [
        'warn',
        { terms: ['TODO', 'FIXME'], location: 'anywhere' }
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          semi: true,
          singleQuote: true,
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          bracketSpacing: true,
          trailingComma: 'es5',
          arrowParens: 'avoid',
        },
      ],
    },
    plugins: {
      prettier: pluginPrettier,
    },
  },
];
