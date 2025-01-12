import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Projects from './pages/Projects/Projects';
import Tickets from './pages/Tickets/Tickets';
import NavBar from './components/NavBar';
import CreateUserStory from './pages/UserStories/CreateUserStory';


function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/projects" element={<PrivateRoute component={Projects} />} />
          <Route path="/tickets" element={<PrivateRoute component={Tickets} />} />
          <Route path="/create-user-story" element={<PrivateRoute component={CreateUserStory} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Rutas privadas
function PrivateRoute({ component: Component }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

export default App;

