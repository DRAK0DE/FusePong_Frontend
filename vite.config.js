import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  define: {
    'process.env': {
      VITE_API_URL: JSON.stringify('https://fusepongbackend-production.up.railway.app/'),
    },
  },
});