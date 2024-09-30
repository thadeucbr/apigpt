import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs}'], // Inclua seus arquivos de teste
    exclude: ['node_modules', 'dist', 'cypress'],
    // Adicione as opções desejadas aqui
    silent: false, // Para mostrar logs detalhados
  },
});
