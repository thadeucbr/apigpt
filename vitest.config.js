import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Use o ambiente Node.js para testes
    coverage: {
      provider: 'v8', // Use o V8 para relatórios de cobertura
    },
  },
});
