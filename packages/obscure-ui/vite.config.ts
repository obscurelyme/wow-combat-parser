import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    // eslintPlugin({ cache: false, include: ['./src/**/*.ts', './src/**/*.tsx'], exclude: ['node_modules'] }),
  ],
  optimizeDeps: {
    include: ['@obscure/types'],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      // TODO(Fix this later): https://github.com/TanStack/query/issues/5175
      onwarn: (warning, warn) => {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
    commonjsOptions: {
      include: [/obscure-types/, /node_modules/],
    },
  },
});
