import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav style={{ background: '#ccc', padding: '10px' }}>
      {isAuthenticated ? (
        <>
          <Link to="/" style={{ marginRight: '10px' }}>Dashboard</Link>
          <Link to="/projects" style={{ marginRight: '10px' }}>Proyectos</Link>
          <Link to="/create-user-story" style={{ marginRight: '10px' }}>Crear Ticket</Link>
          <Link to="/tickets" style={{ marginRight: '10px' }}>Tickets</Link>
          <button onClick={logout} style={{ marginLeft: '10px' }}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
