import axios from 'axios';

// Ajusta la baseURL a donde corre tu backend. 
// En desarrollo local, si tu servidor corre en puerto 4000, usa:
const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export default api;