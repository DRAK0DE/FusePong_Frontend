import axios from 'axios';

// Configuración de Axios con la URL del backend en Railway
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://fusepongbackend-production.up.railway.app/api',
});

export default api;
