import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Inicio</h2>
      <button onClick={handleLoginRedirect}>Iniciar Sesión</button>
      <button onClick={handleRegisterRedirect}>Registrarse</button>
    </div>
  );
};

export default Home;
