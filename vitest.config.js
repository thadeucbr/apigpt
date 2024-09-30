import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs}'], // Inclua seus arquivos de teste
    exclude: [
      'node_modules', 
      'dist', 
      'cypress', 
      'src/database/config/mongoose.config.js',
      'src/database/model',
      'src/database/schema',
      'src/helper/gpt/tool',
      'src/helper/swagger'
    ],
    // Adicione as opções desejadas aqui
    silent: false, // Para mostrar logs detalhados
  },
});
