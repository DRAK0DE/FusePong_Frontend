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
    <div className='contentRegister'>
      <h2 className='contentRegister__titulo'>Crear Cuenta</h2>
      
      <div className='contentRegister__register register'>
        <form className='register__form form' onSubmit={handleRegister}>
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

          <div className='form__company company'>
          <label className='company__label'>Selecciona una compañía</label><br />
            <select className='company__select select'
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

          <button className='form__button' type="submit">
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
