import { URL } from 'node:url';
import react from '@vitejs/plugin-react';
import path from 'path';
import sass from 'sass'

console.log(process.env.VITE_HOST_URL)

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
    build: {
      allowedHosts: true,
      allowedHost: true,
      proxy: {
        [process.env.VITE_API_PREFIX ?? '/api']: new URL(process.env.VITE_BACKEND_URL ?? 'http://localhost:3000').origin,
      },
      changeOrigin: true
    },
    preview: {
      allowedHosts: true,
      allowedHost: true,
      proxy: {
        [process.env.VITE_API_PREFIX ?? '/api']: new URL(process.env.VITE_BACKEND_URL ?? 'http://localhost:3000').origin,
      },
      changeOrigin: true
    },
    server: {
      allowedHosts: true,
      allowedHost: true,
      port: process.env.VITE_APP_PORT,
      proxy: {
        [process.env.VITE_API_PREFIX ?? '/api']: new URL(process.env.VITE_BACKEND_URL ?? 'http://localhost:3000').origin,
      },
      changeOrigin: true
    },
};
