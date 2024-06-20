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

  const backgroundStyle = {
    backgroundImage: "C:/Users/Asus/OneDrive - Instituto Politecnico Nacional/Documents/notepad2/imagenes/fondoLago.jpg",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  return (
    <div>
      <h2>Inicio</h2>

    <div style={backgroundStyle} >
      <h2>NOTEPalace</h2>
      <button onClick={handleLoginRedirect}>Iniciar Sesión</button>
      <button onClick={handleRegisterRedirect}>Registrarse</button>
    </div>
  );
};

export default Home;
