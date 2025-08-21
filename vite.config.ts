import { URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const serverURL = new URL(process.env.VITE_BACKEND_URL ?? '<http://localhost:3000>');

  const serverAPIPath = process.env.VITE_API_PREFIX ?? '/api';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: process.env.VITE_APP_PORT,
      proxy: {
        [serverAPIPath]: serverURL.origin,
      },
    },
  };
});
