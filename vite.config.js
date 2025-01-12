import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Puerto para desarrollo local
  },
  define: {
    'process.env': {
      VITE_API_URL: JSON.stringify('https://fusepongbackend-production.up.railway.app/'),
    },
  },
});