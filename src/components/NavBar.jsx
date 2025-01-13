import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className='header'>
      <nav className='nav'>
      {isAuthenticated ? (
        <>
          <span className='nav__right'>
          <Link to="/" className='nav__option'>Dashboard</Link>
          <Link to="/projects" className='nav__option'>Proyectos</Link>
          <Link to="/create-user-story" className='nav__option'>Crear Ticket</Link>
          <Link to="/tickets" className='nav__option'>Tickets</Link>
          </span>
          <button onClick={logout} className='nav__close'>Cerrar sesión</button>
          
        </>
      ) : (
        <>
        <nav className='nav-login'>
          <Link to="/login" className='nav__option'>Ingresar</Link>
          <Link to="/register" className='nav__option'>Registrar</Link>
          </nav>
        </>
      )}
    </nav>
    </div>
  );
}

export default NavBar;
