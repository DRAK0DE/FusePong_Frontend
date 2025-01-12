import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);  // Actualizar el estado global
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);  // Actualizar el estado global
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
