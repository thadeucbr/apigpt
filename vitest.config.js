import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs}'],
    exclude: [
      'node_modules', 
      'dist', 
      'cypress', 
      'src/database/config/mongoose.config.js',
      'src/database/model/**',
      'src/database/schema/**',
      'src/helper/gpt/tool/**',
      'src/helper/swagger/**',
      'src/route/**',
    ],
    silent: false,
    coverage: {
      all: true,
      exclude: [
        'node_modules',
        'src/main.js',
        'eslint.config.js',
        'vitest.config.js',
        'src/database/config/mongoose.config.js',
        'src/database/model/**/*.js',
        'src/database/schema/**/*.js', 
        'src/helper/gpt/tool/**/*.js', 
        'src/helper/swagger/**/*.js',
        'src/route', 
      ],
    },
  },
});
