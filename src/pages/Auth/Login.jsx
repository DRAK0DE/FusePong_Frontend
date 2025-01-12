import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      login(response.data.token);
      alert('Login exitoso');
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales inválidas');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Correo electrónico</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Contraseña</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
