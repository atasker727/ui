import { URL } from 'node:url';
import react from '@vitejs/plugin-react';
import path from 'path';
import sass from 'sass'

console.log(process.env);

export default {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
        },
      },
    },
    preview: {
      allowedHost: ['nasa-vis-ui.onrender.com'],
    },
    server: {
      allowedHosts: ['nasa-vis-ui.onrender.com'],
      port: process.env.VITE_APP_PORT,
      proxy: {
        [process.env.VITE_API_PREFIX ?? '/api']: new URL(process.env.VITE_BACKEND_URL ?? 'http://localhost:3000').origin,
      },
    },
};
