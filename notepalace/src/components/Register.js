import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fondoReflejo from './fondoReflejo.jpg';

const Register = () => {
  const backgroundStyle = {
    backgroundImage: `url(${fondoReflejo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };
  
  const boxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Blanco semitransparente
    padding: '20px',
    borderRadius: '10px',
  };

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/user/register', { nombre_usuario: nombreUsuario, email, contraseña });
      console.log(response.data); // 
      navigate('/login'); // 
    } catch (error) {
      console.error('Error al registrar usuario:', error.response ? error.response.data : error.message);
      alert('Registro fallido');
    }
  };

  const handleHomeRedirect = () => {
    navigate('/home'); 
  };

  return (
    <div style={backgroundStyle}>
      <div style={boxStyle}>
        <form onSubmit={handleRegister}>
          <h2>Registrarse</h2>
          <label>
            Nombre de Usuario:
            <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Contraseña:
            <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
          </label>
          <button type="submit">Registrarse</button>
        </form>
        <button onClick={handleHomeRedirect}>Regresar</button>
      </div> 
    </div>
  );
};

export default Register;

