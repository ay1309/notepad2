import React from 'react';
import { useNavigate } from 'react-router-dom';
import fondoLago from './fondoLago.jpg';

const Home = () => {

  const backgroundStyle = {
    backgroundImage: `url(${fondoLago})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  
  return (
    <div style={backgroundStyle}>
      <h2>Bienvenido</h2>
      <button onClick={handleLoginRedirect}>Iniciar Sesión</button>
      <button onClick={handleRegisterRedirect}>Registrarse</button>
    </div>
  );
};

export default Home;