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
    <div className='contentLogin'>
      <h2 className='contentLogin__titulo'>Iniciar Sesión</h2>

      <div className='contentLogin__login login'>
        <form className='login__form form' onSubmit={handleLogin}>
          <div className='form__email email'>
            <label className='email__label'>Correo electrónico</label><br />
            <input className='email__input'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
            />
          </div>

          <div className='form__password password'>
            <label className='password__label'>Contraseña</label><br />
            <input className='password__input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button className='form__button' type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
