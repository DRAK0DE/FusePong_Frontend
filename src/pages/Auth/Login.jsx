// import React, { useState } from 'react';
// import api from '../../services/api';  // Importamos api.js

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // Llamamos al endpoint: POST /users/login
//       const response = await api.post('/users/login', { email, password });
      
//       // El backend responde con { message, token, user }
//       console.log('Respuesta del backend:', response.data);

//       // Ejemplo: guardar el token en localStorage
//       localStorage.setItem('token', response.data.token);

//       // Redirigir o mostrar mensaje
//       alert('Login exitoso');

//     } catch (error) {
//       console.error('Error al iniciar sesión:', error);
//       alert('Credenciales inválidas');
//     }
//   };

//   return (
//     <div style={{ margin: '2rem' }}>
//       <h2>Iniciar Sesión</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Correo electrónico</label><br />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Ingresa tu correo"
//           />
//         </div>
//         <div style={{ marginTop: '1rem' }}>
//           <label>Contraseña</label><br />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Ingresa tu contraseña"
//           />
//         </div>
//         <button type="submit" style={{ marginTop: '1rem' }}>
//           Ingresar
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';  // Importar el contexto
import api from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();  // Obtener la función login del contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      login(response.data.token);  // Llamar al contexto para actualizar el estado global
      alert('Login exitoso');
      navigate('/');  // Redirigir al Dashboard
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


