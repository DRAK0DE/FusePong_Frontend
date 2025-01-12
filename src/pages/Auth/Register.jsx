import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get('/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error al cargar compañías:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/register', {
        email,
        password,
        companyId
      });
      alert('Usuario registrado con éxito');
      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('No se pudo registrar el usuario');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleRegister}>
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

        <div style={{ marginTop: '1rem' }}>
          <label>Selecciona una compañía</label><br />
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
          >
            <option value="">-- Seleccionar Compañía --</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>
          Registrarme
        </button>
      </form>
    </div>
  );
}

export default Register;
